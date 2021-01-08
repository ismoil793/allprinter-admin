import React, { Component } from "react";
import { httpPost } from "../../../api";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import Cookies from "universal-cookie"
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  Login = e => {
    e.preventDefault();
    const cookies = new Cookies()
    const notyf = new Notyf()

    httpPost({
      url: "api/auth/admin/login",
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(response => {
       if(response.status === 200){
         cookies.set("access_token", response.data.access_token, {path:'/'})
         cookies.set("refresh_token", response.data.refresh_token, {path:'/'})
         notyf.success("Вы успешно вошли в систему")
       }
       this.props.history.push('/dashboard') 
     
      })
      .catch(error => {
        console.log(error);
        notyf.error("Ошибка")
      });
    
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.Login}>
                      <h1>Авторизация</h1>
                      <p className="text-muted">Войдите в свой аккаунт</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          placeholder="Username"
                          autoComplete="username"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          autoComplete="current-password"
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">
                            Войти
                          </Button>
                        </Col>
                        {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Забыли пароль?
                          </Button>
                        </Col> */}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
