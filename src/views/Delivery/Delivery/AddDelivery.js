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
  Input,
  Label,
  Row
} from "reactstrap";

class AddDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name_ru: "",
      name_en: "",
      name_uz: "",
      description_ru: "",
      description_en: "",
      description_uz: "",
      price: "",
      active: 1
    };
  }

 



  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  SubmitHandler = e => {
    const notyf = new Notyf();
    let formData = new FormData();
    formData.append('name[ru]', this.state.name_ru)
    if(this.state.name_uz){
      formData.append('name[uz]', this.state.name_uz)
    }
    if(this.state.name_en){
      formData.append('name[en]', this.state.name_en)
    }
    if(this.state.description_ru){
        formData.append('description[ru]', this.state.description_ru)
      }
    if(this.state.description_uz){
        formData.append('description[uz]', this.state.description_uz)
      }
      if(this.state.description_en){
        formData.append('description[en]', this.state.description_en)
      }
        formData.append('price', this.state.price)
        formData.append('active', this.state.active)
      

    e.preventDefault();

    httpPost({
      url: "api/admin/delivery/create", 
      data: formData, 
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
      
        notyf.success("Вы добавили метод доставки");
        this.setState({
          name_ru: "",
          name_en: "",
          name_uz: "",
          description_ru: "",
          description_en: "",
          description_uz: "",
          price: ""
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({
          name_ru: "",
          name_en: "",
          name_uz: "",
          description_ru: "",
          description_en: "",
          description_uz: "",
          price: ""
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
                    <strong>Добавить метод доставки</strong>
                  </Col>
                </Row>
              </CardHeader>

              <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                <Row>
                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Наименование</Label>
                          <Input
                            type="text"
                            name="name_ru"
                            placeholder=""
                            value={this.state.name_ru}
                            onChange={this.changeHandler}
                          />
                       
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Name</Label>
                          <Input
                            type="text"
                            name="name_en"
                            placeholder=""
                            value={this.state.name_en}
                            onChange={this.changeHandler}
                          />
                       
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Nomi</Label>
                          <Input
                            type="text"
                            name="name_uz"
                            placeholder=""
                            value={this.state.name_uz}
                            onChange={this.changeHandler}
                          />
                        
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                <hr/>
                  <Row>
                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Описание</Label>
                          <Input
                            type="text"
                            name="description_ru"
                            placeholder=""
                            value={this.state.description_ru}
                            onChange={this.changeHandler}
                          />
                       
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Description</Label>
                          <Input
                            type="text"
                            name="description_en"
                            placeholder=""
                            value={this.state.description_en}
                            onChange={this.changeHandler}
                          />
                        
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Tavsifi</Label>
                          <Input
                            type="text"
                            name="description_uz"
                            placeholder=""
                            value={this.state.description_uz}
                            onChange={this.changeHandler}
                          />
                        
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Цена доставки</Label>
                          <Input
                            type="text"
                            name="price"
                            placeholder=""
                            value={this.state.price}
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

export default AddDelivery;
