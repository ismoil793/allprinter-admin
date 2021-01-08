import React, { Component } from "react";
import { Link } from "react-router-dom"
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Button,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { httpGet } from "../../../api";
import CourierBtn from "./CourierButton";

const getBadge = status => {
  return status === 1 ? "success" : "danger";
};

class Courier extends Component {
  constructor() {
    super();
    this.state = {
      carrier: [],
      stateID: null,
      search: '',
      meta: {
        current_page: null,
        last_page: null,
        per_page: 10
      }
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.getCouriers();
    }, 10);
  }

  getCouriers = () => {
    httpGet({
      url: "api/admin/carrier",
        params: {
          search: this.state.search,
          status: this.state.stateID,
          all: 1,
          page: this.state.meta.current_page,
          per_page: this.state.meta.per_page
        }
      })
      .then(response => {
        this.setState({
          carrier: response.data.data,
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

    this.getCouriers();
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
    return paging;
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

    this.getCouriers();
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

    this.getCouriers();
  };

  handleChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.getCouriers();
    });
  };

  render() {
    const { carrier } = this.state;

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
                        <Label htmlFor="text-input">ID</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input
                          type="text"
                          id="text-input"
                          name="search"
                          value={this.state.search}
                          placeholder=""
                          onChange={this.handleChange}
                        />
                      </Col>
                    </FormGroup>
                    

                    <FormGroup column>
                      <Col md="3">
                        <Label htmlFor="text-input">Статус</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input type="select" name="stateID" value={this.state.stateID}  onChange={this.handleChange} id="select">
                        <option value="">Выберите статус</option>
                          <option value="1">Да</option>
                          <option value="0">Нет</option>
                        </Input>
                      </Col>
                    </FormGroup>
                  </Row>
                </Form>
              </CardBody>
             
            </Card>
          </Col>

          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <div className="row d-flex align-items-center justify-content-between">
                  <div className="col-auto">
                    <i className="fa fa-align-justify"></i> Курьеры
                  </div>
                  <div className="col-auto">
                    <Link to='/delivery/carriers/add'>
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
                      <th>Номер телефона</th>
                      <th>ФИО</th>
                      <th>Статус</th>
                      <th>Последняя Активность</th>
                      <th>Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrier
                      ? carrier.map(carry => (
                          <tr key={carry.id}>
                            <td>{carry.id}</td>
                            <td>{carry.username}</td>
                            <td>
                              {carry.first_name} {carry.last_name}
                            </td>
                            {carry.status === 1 ? (
                              <td>
                                <Badge color={getBadge(carry.status)}>
                                  Активный
                                </Badge>
                              </td>
                            ) : (
                              <td>
                                <Badge color={getBadge(carry.status)}>
                                  Не активный
                                </Badge>
                              </td>
                            )}
                            <td>{carry.logged_at}</td>
                            <td><CourierBtn function={this.getCouriers} id={carry.id}/></td>
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

export default Courier;
