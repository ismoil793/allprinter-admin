import React, { Component } from "react";
import { httpGet, httpPost } from "../../api";
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

class AddAdvert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ad_link: "",
      image: null,
      image_preview: "",
      vendor: "",

      start_time: "",
      end_time: "",
      url_position: null,

      category_id: "",

      page_position: "",
      page_url: ""
    };
  }

  componentDidMount() {}

  categoryCallbackFunction = childData => {
    this.setState({ category_id: childData });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeImageHandler = e => {
    this.setState({
      image: e.target.files[0],
      image_preview: URL.createObjectURL(e.target.files[0])
    });
  };

  SubmitHandler = e => {
    const notyf = new Notyf();
    let formData = new FormData();
  
    formData.append("name", this.state.name);

    if (this.state.ad_link) {
      formData.append("ad_link", this.state.ad_link);
    }

    if (this.state.image) {
      formData.append("image", this.state.image);
    }

    if (this.state.vendor) {
      formData.append("vendor", this.state.vendor);
    }

    if (this.state.start_time) {
      formData.append("start_time", this.state.start_time);
    }

    if (this.state.end_time) {
      formData.append("end_time", this.state.end_time);
    }

    if (this.state.category_id) {
      formData.append(`category_id`, this.state.category_id);
    }
    if (this.state.page_url) {
      formData.append(`url`, this.state.page_url);
    }

    if (this.state.page_position) {
      formData.append(`position`, this.state.page_position);
    }

    e.preventDefault();

    httpPost({
      url: "api/admin/ad/create",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        notyf.success("Вы добавили рекламную компанию");
        this.props.history.push('/adverts');
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
                    <strong>Добавить рекламную компанию</strong>
                  </Col>
                </Row>
              </CardHeader>

              <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                  <Row>
                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Название рекламы</Label>
                          <Input
                            type="text"
                            name="name"
                            placeholder=""
                            value={this.state.name}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">ru</FormText>
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Линк</Label>
                          <Input
                            type="text"
                            name="ad_link"
                            placeholder=""
                            value={this.state.ad_link}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">Рекламный линк</FormText>
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">
                            Название рекламодателя
                          </Label>
                          <Input
                            type="text"
                            name="vendor"
                            placeholder=""
                            value={this.state.vendor}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">Впишите название </FormText>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <FormGroup column>
                        <Col md="12">
                          <Label htmlFor="text-input">С</Label>
                        </Col>
                        <Col xs="12" md="12">
                          <Input
                            type="date"
                            id="text-input"
                            name="start_date"
                            value={this.state.start_date}
                            onChange={this.changeHandler}
                            placeholder=""
                          />
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup column>
                        <Col md="12">
                          <Label htmlFor="text-input">По</Label>
                        </Col>
                        <Col xs="12" md="12">
                          <Input
                            type="date"
                            id="text-input"
                            name="end_date"
                            value={this.state.end_date}
                            onChange={this.changeHandler}
                            placeholder=""
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="file-input">
                            Добавить изображение
                          </Label>
                        </Col>
                        <Col xs="12" md="12">
                          <Input
                            type="file"
                            id="file-input"
                            onChange={this.changeImageHandler}
                          />
                        </Col>
                        <Col xs="12" md="6">
                          {this.state.image_preview ? (
                            <img
                              style={{ width: "40%" }}
                              src={this.state.image_preview}
                              alt="Чего"
                            />
                          ) : null}
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="select">Выберите вид рекламы</Label>
                        </Col>
                        <Col xs="12" md="12">
                          <Input
                            onChange={this.changeHandler}
                            type="select"
                            name="group"
                            value={this.state.group}
                            id="select"
                          >
                            <option value="">Выберите вид рекламы</option>
                            <option value="categories">По категориям</option>
                            <option value="page">На странице</option>
                          </Input>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  {this.state.group === "page" ? (
                    <Row>
                      <Col md="6">
                        <FormGroup row>
                          <Col md="12">
                            <Label htmlFor="text-input">
                              Страница для рекламы
                            </Label>
                            <Input
                              type="text"
                              name="page_url"
                              placeholder=""
                              value={this.state.page_url}
                              onChange={this.changeHandler}
                            />
                            <FormText color="muted">
                              ex - ( / or /contact)
                            </FormText>
                          </Col>
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup row>
                          <Col md="12">
                            <Label htmlFor="select">Выберите вид рекламы</Label>
                          </Col>
                          <Col xs="12" md="12">
                            <Input
                              onChange={this.changeHandler}
                              type="select"
                              name="page_position"
                              value={this.state.page_position}
                              id="select"
                            >
                              <option value="">
                                Выберите позицию для рекламы
                              </option>
                              <option value="left">Слева</option>
                              <option value="right">Справа</option>
                              <option value="middle">Центр</option>
                            </Input>
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

export default AddAdvert;
