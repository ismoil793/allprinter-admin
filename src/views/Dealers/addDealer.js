import React, { Component } from "react";
import { httpPost } from "../../api";
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

class AddDealer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: "",
      first_name:"",
      last_name: "",
      email:""
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  SubmitHandler = e => {
    const notyf = new Notyf();
    let formData = new FormData();

    formData.append("phone", this.state.phone);
    formData.append("password", this.state.password);
    formData.append("first_name", this.state.first_name);
    formData.append("last_name", this.state.last_name);
    formData.append("email", this.state.email);

    e.preventDefault();

    httpPost({
      url: "api/admin/dealer/create", 
      data: formData
    })
      .then(response => {
    
        notyf.success("Вы добавили дилера");
      })
      .catch(error => {
        console.log(error);
        notyf.error('Пользователь уже зарегистрирован')
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
                    <strong>Добавить дилера</strong>
                  </Col>
                </Row>
              </CardHeader>

              <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Номер дилера</Label>
                        </Col>
                        <Col md="9">
                          <Input
                            type="text"
                            id="text-input"
                            name="phone"
                            placeholder=""
                            value={this.state.phone}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">
                            Формат - 9989хххххххх
                          </FormText>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Пароль</Label>
                        </Col>
                        <Col md="9">
                          <Input
                            type="password"
                            id="text-input"
                            name="password"
                            placeholder=""
                            value={this.state.password}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">пароль</FormText>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Имя</Label>
                        </Col>
                        <Col md="9">
                          <Input
                            type="text"
                            id="text-input"
                            name="first_name"
                            placeholder=""
                            value={this.state.first_name}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">
                           Имя
                          </FormText>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Фамилия</Label>
                        </Col>
                        <Col md="9">
                          <Input
                            type="text"
                            id="text-input"
                            name="last_name"
                            placeholder=""
                            value={this.state.last_name}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">
                           Фамилия
                          </FormText>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Email</Label>
                        </Col>
                        <Col md="9">
                          <Input
                            type="text"
                            id="text-input"
                            name="email"
                            placeholder=""
                            value={this.state.email}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">
                            Email
                          </FormText>
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

export default AddDealer;
