import React, { Component } from "react";
import { httpPost, httpGet } from "../../../api";
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

class AddShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
     shop_name: '',
      shop_id: null,
     users:[]
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount(){
    httpGet({
      url: "api/admin/dealer" })
    .then(response => {
      this.setState({ users: response.data.data });
    })
    .catch(error => {
      console.log(error);
    });
  }

  SubmitHandler = e => {
    const notyf = new Notyf();
    e.preventDefault();
   
      httpPost({
        url: `api/admin/dealer/shop/add`,
        data:{
          name: this.state.shop_name,
          user_id: this.props.location.dealer_id
        }
      }).then(response => {
        notyf.success("Вы добавили магазин");
      })
      .catch(error => {
        notyf.error('Магазин с таким названием уже существует')
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
                    <strong>Открыть магазин</strong>
                  </Col>
                </Row>
              </CardHeader>

              <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Название магазина</Label>
                        </Col>
                        <Col md="9">
                          <Input
                            type="text"
                            id="text-input"
                            name="shop_name"
                            placeholder=""
                            value={this.state.shop_name}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">
                            Добавьте магазин
                          </FormText>
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Выбрать дилера</Label>
                        </Col>
                        <Col md="9">
                        <Input
                          type="select"
                          name="shop_id"
                          value={this.state.shop_id}
                          onChange={this.changeHandler}
                          id="select"
                        >
                          <option value=""> Выберите дилера </option>
                          {this.state.users ? this.state.users.map(user => (
                            <option value={user.id}>{user.first_name}</option>
                          )) : null}
                          
                   
                        </Input>
                          <FormText color="muted">
                          Выбрать
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

export default AddShop;
