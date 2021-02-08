import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";

import { httpGet } from "../../api";
import CartButton from "./UpdateButton";

class Carts extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      min_price: null,
      max_price: null,
      carts: [],
      first: 0,
      last: 10,
      meta: {
        current_page: null,
        last_page: null,
        per_page: 10
      }
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.getCarts();
    }, 10);
  }

  getCarts = () => {
    httpGet({
      url: "/api/admin/cart",
      params: {
        min_price: this.state.min_price,
        max_price: this.state.max_price,
        search: this.state.search,
        page: this.state.meta.current_page,
        per_page: this.state.meta.per_page
      }
    })
      .then(response => {
        this.setState({
          carts: response.data.data,
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
    this.getCarts();
  };

  createPaging = () => {
    let paging = [];

    for (let i = 1; i <= this.state.meta.last_page; i++) {
      if (this.state.meta.current_page === i) {
        paging.push(
          <PaginationItem active key={i} onClick={() => this.Pagination(i)}>
            <PaginationLink tag="button">{i}</PaginationLink>
          </PaginationItem>
        );
      } else {
        paging.push(
          <PaginationItem key={i} onClick={() => this.Pagination(i)}>
            <PaginationLink tag="button">{i}</PaginationLink>
          </PaginationItem>
        );
      }
    }
    let newPaging = paging.length > 35 || window.innerWidth < 1680 ? paging.slice(this.state.first, this.state.last) : paging
    return newPaging
  };

  IncrementPage = e => {
    e.preventDefault();
    const meta = this.state.meta;

    if (meta.current_page < meta.last_page) {
      meta.current_page = meta.current_page + 1;
      this.setState({
        meta: meta,
        first: this.state.first + 10,
        last: this.state.last + 10
      });
    } else {
      this.setState({
        meta: meta
      });
    }

    this.getCarts();
  };

  DecrementPage = e => {
    const meta = this.state.meta;

    e.preventDefault();
    if (meta.current_page > 1) {
      meta.current_page = meta.current_page - 1;
      if (this.state.first >= 0) {
        this.setState({
          meta: meta,
          first: this.state.first - 10,
          last: this.state.last - 10
        });
      }
    } else {
      this.setState({ meta: meta });
    }

    this.getCarts();
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.getCarts();
    });
  };

  render() {
    const { carts } = this.state;
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
                          placeholder=""
                          onChange={this.handleChange}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup column>
                      <Col md="12">
                        <Label htmlFor="text-input">Мин цена</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input
                          type="text"
                          id="text-input"
                          name="min_price"
                          value={this.state.min_price}
                          placeholder=""
                          onChange={this.handleChange}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup column>
                      <Col md="12">
                        <Label htmlFor="text-input">Макс цена</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input
                          type="text"
                          id="text-input"
                          name="max_price"
                          value={this.state.max_price}
                          placeholder=""
                          onChange={this.handleChange}
                        />
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
                <i className="fa fa-align-justify"></i> Таблица корзин
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Клиент</th>
                      <th>Телефон</th>
                      <th>Дата</th>
                      <th>Сумма</th>
                      <th>Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts
                      ? carts.map(cart => (
                        <tr>
                          <td>{cart.id}</td>
                          {cart.device === null ? (
                            <td></td>
                          ) : (
                              <td>
                                {cart.device.user.first_name}{" "}
                                {cart.device.user.last_name}{" "}
                              </td>
                            )}
                          <td>{cart.device.user.phone.replace(/^(\d{3})(\d{2})\s*(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5')} </td>
                          <td>{cart.updated_at}</td>
                          <td>
                            {cart.total_with_discount
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                              сум
                            </td>

                          <td>
                            <CartButton id={cart.id} />
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

export default Carts;
