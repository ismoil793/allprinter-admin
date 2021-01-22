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

import { httpGet } from "../../api";
// import UpdateDeleteDeliveries from "./components/EditButton";

import UpdateDeleteKPI from "./component/EditButton";
const getBadge = status => {
  return status === 1 ? "success" : "danger";
};

class Coupon extends Component {
  constructor() {
    super();
    this.state = {
      deliveries: [],
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
    this.getCouriers();
  }

  getCouriers = () => {
    httpGet({
      url: "api/admin/coupon",
      params: {
        page: this.state.meta.current_page,
        per_page: this.state.meta.per_page
      }
    })
      .then(response => {
        this.setState({
          deliveries: response.data.data,
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
    localStorage.setItem("current_page", e);
    meta.current_page = e;

    this.setState({ meta: meta });

    this.getCouriers();
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

    let newPaging = paging.length > 35 ? paging.slice(this.state.first, this.state.last) : paging
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

    this.getCouriers();
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

    this.getCouriers();
  };

  render() {
    const { deliveries } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <div className="row d-flex align-items-center justify-content-between">
                  <div className="col-auto">
                    <i className="fa fa-align-justify"></i>Купоны
                  </div>
                  <div className="col-auto">
                    <Link to="/addcoupon">
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
                      <th>Ключ купона</th>
                      <th>Дата создания</th>
                      <th>Дата окончания</th>
                      <th>Сумма купона</th>
                      <th>Типы</th>
                      <th>Вариация</th>
                      <th>К-во использования</th>
                      <th>Статус</th>
                      <th>Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveries
                      ? deliveries.map((delivery) => (
                        <tr key={delivery.id}>
                          <td>{delivery.id}</td>
                          <td>{delivery.code}</td>
                          <td>
                            {delivery.created_at ? delivery.created_at : null}
                          </td>
                          <td>
                            {delivery.until ? delivery.until : "Бесконечно"}
                          </td>
                          <td>
                            {delivery.value}  {delivery.type === 2 || delivery.type === 4 ? " %" : " сум"}
                          </td>
                          <td>
                            {delivery.type === 1
                              ? "Сумма купона для товара"
                              : delivery.type === 2
                                ? "Процент купона для товара"
                                : delivery.type === 3
                                  ? "Сумма купона для корзины"
                                  : "Процент купона для корзины"}
                          </td>
                          <td>{delivery.status === 1 ? "Купон" : "Подарочный гифт"}</td>
                          <td>{delivery.used}</td>
                          <td> {delivery.is_finished === 0 ? <Badge color="success">Активный</Badge> : <Badge color="danger">Неактивный</Badge>}</td>
                          <td>
                            <UpdateDeleteKPI
                              function={this.getCouriers}
                              id={delivery.id}
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

export default Coupon;
