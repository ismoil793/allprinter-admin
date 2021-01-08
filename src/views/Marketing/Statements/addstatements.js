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
import ParentCategory from "./CheckStatement";


class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      status: null,
      parent_id: '',
      links: []
    };
  }

  componentDidMount() {
      httpGet({
        url: "/api/clerk/cashbox/link/",
        params: {
          type: 'recursive'
        }
      })
      .then(response => {
        this.setState({
          links: response.data.data
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
    if (this.state.parent_id) {
        formData.append("status", this.state.status);
    }
    if (this.state.parent_id) {
      formData.append("parent_id", this.state.parent_id);
    }
  
    e.preventDefault();

      httpPost({
        url: "api/clerk/cashbox/link/create", 
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        notyf.success("Вы добавили Линк");
        this.props.history.push("/statements");
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
                    <strong>Добавить Линк</strong>
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
                          <Label htmlFor="text-input">Родительский линк</Label>
                        </Col>
                        <Col md="9">
                          <ParentCategory
                            categoryFunction={this.categoryCallbackFunction}
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

export default AddLink;
