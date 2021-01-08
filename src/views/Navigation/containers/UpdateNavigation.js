import React, { Component } from "react";
import { httpGet, httpPost } from "../../../api";
import { Notyf } from "notyf";
import { useStore } from "effector-react";
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
  Row,
  Badge
} from "reactstrap";
import { $isDataPending } from "../model/stores";
import { fetchAllNavigations } from "../model/effects";

class UpdateNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shop_name: "",
      status: null,
      activate: null,
      sidebar: [],
      name: "",
      code: "",
      type: "",
      active: 1,
      url: "",
      title:"",
      target:"",
      variant:"",
      parentNav: "",
      navigations: []
    };
  }

  componentWillMount() {
    if (this.props.location.sidebar_id !== undefined) {
      localStorage.setItem("sidebar_id", this.props.location.sidebar_id);
    }
  }

  componentDidMount() {
    httpGet({
      url: "api/admin/sidebar",
      params: {
        sidebar_id: localStorage.getItem("sidebar_id")
      }
    })
      .then(response => {
        console.log(response.data.data)
        this.setState({
          icon: response.data.data.icon,
          name: response.data.data.name,
          type: response.data.data.type,
          url: response.data.data.url,
          code: response.data.data.code,
          title: response.data.data.title
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  SubmitHandler = e => {
    const notyf = new Notyf();
    e.preventDefault();
    var temp_values={

    };
    if(this.state.name){
      Object.assign(temp_values, {name: {value: this.state.name}});
    }
      if(this.state.type){
      Object.assign(temp_values, {type: {value: this.state.type}});
    }
      if(this.state.url)
      Object.assign(temp_values, {url: {value: this.state.url}});
      if(this.state.icon)
      Object.assign(temp_values, {icon: {value: this.state.icon}});
      if(this.state.title)
      Object.assign(temp_values, {title: {value: this.state.title}});
      if(this.state.target)
      Object.assign(temp_values, {target: {value: this.state.target}});
      if(this.state.variant)
      Object.assign(temp_values, {variant: {value: this.state.variant}});


    httpPost({
      url: `api/admin/sidebar/update/${localStorage.getItem("sidebar_id")}`,
      data: {
          values:  temp_values
      }
      
    })
      .then(response => {
        notyf.success("Вы обновили навигацию");
      })
      .catch(error => {
        console.log(error);
        notyf.error("Пользователь уже зарегистрирован");
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
                  <Col xs="12" md="3">
                    <strong>Обновить Навигацию</strong>
                  </Col>
                </Row>
              </CardHeader>
              <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="text-input">
                        Название навигации <span className="red-star">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        placeholder=""
                        value={this.state.name}
                        required
                        onChange={this.changeHandler}
                      />
                    </Col>
                 
                    <Col md="4">
                      <Label htmlFor="text-input">
                       Укажите путь{" "}
                        <span className="red-star">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="url"
                        placeholder=""
                        value={this.state.url}
                        onChange={this.changeHandler}
                      />
                    </Col>
                    <Col md="4">
                      <Label htmlFor="text-input">
                        Относится к Админке/Складу
                        <span className="red-star">*</span>
                      </Label>
                      <Input
                        type="select"
                        name="type"
                        required
                        value={this.state.type}
                        onChange={this.changeHandler}
                      >
                        <option value="">Выберите значение</option>

                        <option value="stock">Склад</option>

                        <option value="admin">Админ панель</option>
                      </Input>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="6">
                      <Label htmlFor="text-input">
                        Иконка навигации <span className="red-star">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="icon"
                        value={this.state.icon}
                        onChange={this.changeHandler}
                      />
                    </Col>
                    {/* <Col md="6">
                        <Label htmlFor="text-input">
                          Родителская Навигация
                        </Label>
                        <Input
                          type="select"
                          name="parentNav"
                          required
                          value={this.state.parentNav}
                          onChange={this.changeHandler}
                        > 
                          <option value="default">Выберите значение</option>
                          {this.state.navigations.map(elem => {
                            if (
                              !elem.title &&
                              elem.title !== "web" &&
                              elem.title !== "mobile" &&
                              !elem.external
                            )
                              return (
                                <option
                                  key={elem.id}
                                  value={elem.id}
                                  disabled={!elem.active}
                                >
                                  {elem.name}
                                </option>
                              );
                            return null;
                          })}
                        </Input>
                      </Col> */}
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o" /> Сохранить
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

export default UpdateNavigation;
