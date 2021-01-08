import React, { Component } from "react";
import { httpPost } from "../../../api";
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

class AddCourier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      car_model: "",
      status: 1
    };
  }

  changeImageHandler = e => {
    this.setState({ image: e.target.files[0] });
  };



  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  SubmitHandler = e => {
    const notyf = new Notyf();
    let formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
    formData.append("first_name", this.state.first_name);
    formData.append("last_name", this.state.last_name);
    formData.append("status", this.state.status);

    e.preventDefault();

      httpPost({
        url: "api/admin/carrier/create", 
        data: formData, 
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
      
        notyf.success("Вы добавили курьера");
        this.setState({
          first_name: "",
          last_name: "",
          username: "",
          password: "",
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({
          first_name: "",
          last_name: "",
          username: "",
          password: "",
        })
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
                    <strong>Добавить Курьера</strong>
                  </Col>
                </Row>
              </CardHeader>

              <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Номер телефона</Label>
                        </Col>
                        <Col md="9">
                          <Input
                            type="text"
                            id="text-input"
                            name="username"
                            placeholder=""
                            value={this.state.username}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">Номер телефона</FormText>
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
                          <FormText color="muted">Пароль</FormText>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Имя</Label>
                          <Input
                            type="text"
                            name="first_name"
                            placeholder=""
                            value={this.state.first_name}
                            onChange={this.changeHandler}
                          />
                       
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Фамилия</Label>
                          <Input
                            type="text"
                            name="last_name"
                            placeholder=""
                            value={this.state.last_name}
                            onChange={this.changeHandler}
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
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddCourier;
