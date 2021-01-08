import React, { Component } from "react";
import { httpGet, httpPost } from "../../../api";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row
} from "reactstrap";
import ParentCategory from "./CheckCategory";
import ParentBrand from "./CheckBrand";

class UpdateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ru: "",
      uz: "",
      en: "",
      group: "",
      quantity: "",
      parent_id:[],
      checked: '',
      brand_id: null,
      random: '',
      active: '',
      request_name: "",
      request_value: ""
    };
  }

  componentWillMount() {
    if (this.props.location.group_id !== undefined) {
      localStorage.setItem("group_id", this.props.location.group_id);
    }
  }

  componentDidMount() {
    httpGet({
        url: "api/admin/group",
        params: {
          group_id: localStorage.getItem("group_id")
        }
      })
        .then(response => {
          this.setState({
            name: response.data.data.name.ru,
            uz: response.data.data.name.uz,
            en: response.data.data.name.en,
            active: response.data.data.active,
            type: response.data.data.type,
            group: response.data.data.group,
            quantity: response.data.data.take,
            random: response.data.data.random,
            checked: response.data.data.categories.map(category => category.id)
          });
        })
        .catch(error => {
          console.log(error);
        });

  }

  categoryCallbackFunction = childData => {
    this.setState({ parent_id: childData });
  };

  brandCallbackFunction = childData => {
    this.setState({ brand_id: childData });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  SubmitHandler = e => {
    const notyf = new Notyf();
    let formData = new FormData();
    formData.append("name[ru]", this.state.ru);
    formData.append("active", this.state.active);

    if (this.state.quantity) {
    formData.append("take", this.state.quantity);
    }
     
    if (this.state.uz) {
      formData.append("name[uz]", this.state.uz);
    }
    if (this.state.en) {
      formData.append("name[en]", this.state.en);
    }

    if (this.state.group) {
      formData.append("group", this.state.group);
    }

    if (this.state.type) {
        formData.append("type", this.state.type);
    }

    if (this.state.random) {
        formData.append("random", this.state.random);
    }

    if (this.state.parent_id && this.state.group === "categories") {
 
        for (let i = 0; i < this.state.parent_id.length; i++) {
            formData.append(`categories[${i}]`, this.state.parent_id[i]);
        }
     
      }

    if (this.state.brand_id && this.state.group === "brands") {
      formData.append("brands", this.state.brand_id);
    }
    if (this.state.request_name) {
      formData.append("request_name", this.state.request_name);
    }
    if (this.state.request_value) {
      formData.append("request_value", this.state.request_value);
    }

    e.preventDefault();

    httpPost({
      url: `api/admin/group/update/${localStorage.getItem("group_id")}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        notyf.success("Вы обновили группу");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
     
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="12" md="2">
                    <strong>Добавить Группу</strong>
                  </Col>
                </Row>
              </CardHeader>

              <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                  <Row>
                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Название группы</Label>
                          <Input
                            type="text"
                            name="ru"
                            placeholder=""
                            value={this.state.ru}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">ru</FormText>
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Название группы</Label>
                          <Input
                            type="text"
                            name="uz"
                            placeholder=""
                            value={this.state.uz}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">uz</FormText>
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Название группы</Label>
                          <Input
                            type="text"
                            name="en"
                            placeholder=""
                            value={this.state.en}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">en</FormText>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">
                            Кодовое название группы
                          </Label>
                          <Input
                            type="text"
                            name="type"
                            placeholder=""
                            value={this.state.type}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">
                            Type (ex. hot_products)
                          </FormText>
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="select">Выберите группу</Label>
                        </Col>
                        <Col xs="12" md="12">
                          <Input
                            onChange={this.changeHandler}
                            type="select"
                            name="group"
                            value={this.state.group}
                            id="select"
                          >
                            <option value="">Выберите вид группы</option>
                            <option value="categories">По категориям</option>
                            <option value="brands">Бренды</option>
                            <option value="product_request">
                              Product_request
                            </option>
                          </Input>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">
                        Количество
                          </Label>
                          <Input
                            type="text"
                            name="quantity"
                            placeholder=""
                            value={this.state.quantity}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">
                           Количество - 8
                          </FormText>
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="select">Выберите статус</Label>
                        </Col>
                        <Col xs="12" md="12">
                          <Input
                            onChange={this.changeHandler}
                            type="select"
                            name="active"
                            value={this.state.active}
                            id="select"
                          >
                            <option value="">Выберите статус</option>
                            <option value="1">Активный</option>
                            <option value="0">Не активный</option>
                          
                          </Input>
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="select">Показывать рандомно</Label>
                        </Col>
                        <Col xs="12" md="12">
                          <Input
                            onChange={this.changeHandler}
                            type="select"
                            name="random"
                            value={this.state.random}
                            id="select"
                          >
                            <option value="">Выберите статус</option>
                            <option value="1">Да</option>
                            <option value="0">Нет</option>
                          
                          </Input>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  {this.state.group === "brands" ? (
                    <Row>
                      <Col md="12">
                        <FormGroup row>
                          <Col md="3">
                            <Label htmlFor="text-input">Выберите бренды</Label>
                          </Col>
                          <Col md="9">
                            <ParentBrand
                           
                             categoryFunction={this.brandCallbackFunction}
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                  ) : null}

                  {this.state.group === "categories" ? (
                    <Row>
                      <Col md="12">
                        <FormGroup row>
                          <Col md="3">
                            <Label htmlFor="text-input">
                              Главная категория
                            </Label>
                          </Col>
                          <Col md="9">
                            <ParentCategory
                             checked = {this.state.checked}
                              categoryFunction={this.categoryCallbackFunction}
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                  ) : null}
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> Сохранить
                  </Button>
                  <Button type="reset" size="sm" color="danger">
                    <i className="fa fa-ban"></i> Сбросить
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UpdateGroup;
