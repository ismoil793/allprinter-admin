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
import UpdateParentCategory from "./UpdateCheckStatement";

class UpdateStatement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      parent_id: "",
      status: '' , 
      selected_parent: '',
    };
  }

  componentWillMount() {
    if (this.props.location.id !== undefined) {
      localStorage.setItem("link_id", this.props.location.id);
    }
  }

  componentDidMount() {
    
    httpGet({
      url: `api/clerk/cashbox/link`,
      params: {
        link_id: localStorage.getItem("link_id")
      }
    })
      .then(response => {
        this.setState({
          name: response.data.data.name,
          status: response.data.data.status,
          selected_parent: response.data.data.parent
            ? response.data.data.parent.id
            : ""
        });

        
      })
      .catch(error => {
        console.log(error);
      });
  }


  categoryCallbackFunction = childData => {
    this.setState({ parent_id: childData });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  SubmitHandler = e => {
    const notyf = new Notyf();
    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("status", this.state.status);

    if (this.state.parent_id) {
      formData.append("parent_id", this.state.parent_id);
    } else {
      formData.append("parent_id", this.state.selected_parent);
    }
    e.preventDefault();

    httpPost({
      url: `api/admin/category/update/${localStorage.getItem("link_id")}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        notyf.success("Вы обновили линк");
        this.props.history.push("/statements");  
    })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { ru, slug } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="12" md="2">
                    <strong>Обновить линк</strong>
                  </Col>
                </Row>
              </CardHeader>

              <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                <Row>
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Название Категории</Label>
                          <Input
                            type="text"
                            name="name"
                            placeholder=""
                            value={this.state.name}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">Название</FormText>
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Статус</Label>
                          <Input
                              onChange={this.changeHandler}
                              type="select"
                              name="status"
                              value={this.state.status}
                              id="select"
                            >
                              <option value="">
                                Выберите статус
                              </option>
                              <option value="1">Активный</option>
                              <option value="0">Не активный</option>
                            </Input>
                          <FormText color="muted">Статус</FormText>
                        </Col>
                      </FormGroup>
                    </Col>

                </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Главная категория</Label>
                        </Col>
                        <Col md="9">
                          <UpdateParentCategory
                            categoryFunction={this.categoryCallbackFunction}
                            selected_parent={this.state.selected_parent}
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
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

export default UpdateStatement;