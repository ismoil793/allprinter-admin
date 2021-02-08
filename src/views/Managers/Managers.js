import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";

import { Link } from "react-router-dom";
import { httpGet } from "../../api";

import ManagerButtons from "./ManagerButtons"

class Managers extends Component {
  constructor() {
    super();
    this.state = {
      managers: [],
      active: null,
      search: "",
      meta: {
        current_page: null,
        last_page: null,
        per_page: 10
      }
    };
  }


  componentDidMount() {
    this.getManagers();
  }

  getManagers = () => {
    httpGet({
      url: "api/admin/manager",
      params: {
        search: this.state.search,
        page: this.state.meta.current_page,
        per_page: this.state.meta.per_page
      }
    })
      .then(response => {
        console.log(response.data.data)
        this.setState({
          managers: response.data.data,
          meta: {
            current_page: response.data.meta.current_page,
            last_page: response.data.meta.last_page,
            per_page: response.data.meta.per_page
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  Pagination = e => {
    const meta = this.state.meta;
    meta.current_page = e;

    this.setState({ meta: meta });

    this.getManagers();
  };

  createPaging = () => {
    let paging = [];

    for (let i = 1; i <= this.state.meta.last_page; i++) {
      paging.push(
        <PaginationItem key={i} onClick={() => this.Pagination(i)}>
          <PaginationLink tag="button">{i}</PaginationLink>
        </PaginationItem>
      );
    }
    let newPaging = paging.length > 35 || window.innerWidth < 1680 ? paging.slice(this.state.first, this.state.last) : paging
    return newPaging
  };


  IncrementPage = e => {
    e.preventDefault();
    const meta = this.state.meta;

    if (meta.current_page < meta.last_page) {
      meta.current_page = meta.current_page + 1;
      this.setState({ meta: meta });
    } else {
      this.setState({ meta: meta });
    }

    this.getManagers();
  };

  DecrementPage = e => {
    const meta = this.state.meta;

    e.preventDefault();
    if (meta.current_page > 1) {
      meta.current_page = meta.current_page - 1;
      this.setState({ meta: meta });
    } else {
      this.setState({ meta: meta });
    }

    this.getManagers();
  };




  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      setTimeout(() => {
        this.getManagers();
      }, 100);
    });
  };

  Reset = () => {
    this.setState({
      search: "",
      active: null
    });
  };

  render() {
    const { managers } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <strong>Фильтры</strong>
              </CardHeader>
              <CardBody>
                <Form
                  action=""
                  method="post"
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <Row>
                    <FormGroup column>
                      <Col md="12">
                        <Label htmlFor="text-input">Поиск</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input
                          type="text"
                          id="text-input"
                          name="search"
                          value={this.state.search}
                          onChange={this.handleChange}
                          placeholder=""
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup column>
                      <Col md="3">
                        <Label htmlFor="text-input">Показывать</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input
                          type="select"
                          name="active"
                          value={this.state.active}
                          onChange={this.handleChange}
                          id="select"
                        >
                          <option value=""> Выберите статус </option>
                          <option value="1">Активный</option>
                          <option value="0">Не активный</option>
                        </Input>
                      </Col>
                    </FormGroup>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  onClick={this.Reset}
                  type="reset"
                  size="sm"
                  color="danger"
                >
                  <i className="fa fa-ban"></i> Сбросить
                </Button>
              </CardFooter>
            </Card>
          </Col>

          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <div className="row d-flex align-items-center justify-content-between">
                  <div className="col-auto">
                    <i className="fa fa-align-justify"></i> Роли
                  </div>
                  <div className="col-auto">
                    <Link to='/userroles/managers/add'>
                      <Button className="fa fa-plus" color="primary">
                        <span className="ml-1">Добавить</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>ФИО</th>
                      <th>Email </th>
                      <th>Роль</th>
                      <th>Дата добавление</th>
                      <th>Дата последней активности</th>
                      {/* <th>Баланс</th> */}
                      <th>Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managers
                      ? managers.map(manager => (
                        <tr>
                          <td>{manager.id}</td>
                          <td>
                            {manager.first_name} {manager.last_name}
                          </td>
                          <td>{manager.email}</td>
                          <td>
                            {manager.roles
                              ? manager.roles.map(role => role.name)
                              : null}
                          </td>
                          <td>{manager.created_at}</td>
                          <td>{manager.logged_at}</td>
                          {/* <td>{manager.bonus ? manager.bonus.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ") : null} сум</td> */}
                          <td>
                            <ManagerButtons
                              function={this.getRoles}
                              id={manager.id}
                            />
                          </td>
                        </tr>
                      ))
                      : null}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem onClick={this.DecrementPage}>
                    <PaginationLink previous tag="button">
                      Пред
                    </PaginationLink>
                  </PaginationItem>

                  {this.createPaging()}

                  <PaginationItem onClick={this.IncrementPage}>
                    <PaginationLink next tag="button">
                      След
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Managers;
