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

import { httpGet } from "../../../api";
import UpdateDeleteDeliveries from "./components/EditButton";

const getBadge = status => {
  return status === 1 ? "success" : "danger";
};

class Deliveries extends Component {
  constructor() {
    super();
    this.state = {
      deliveries: [],
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
      url: "api/admin/delivery",
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
                    <i className="fa fa-align-justify"></i> Методы доставок
                  </div>
                  <div className="col-auto">
                    <Link to='/delivery/deliveries/add'>
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
                      <th>Наименование</th>
                      <th>Описание</th>
                      <th>Цена</th>
                      <th>Статус</th>
                      <th>Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveries
                      ? deliveries.map(delivery => (
                          <tr key={delivery.id}>
                            <td>{delivery.id}</td>
                            <td>{delivery.name.ru}</td>
                            <td>
                              {delivery.description.ru}
                            </td>
                            <td>
                              {delivery.price} сум
                            </td>
                            {delivery.active === 1 ? (
                              <td>
                                <Badge color={getBadge(delivery.active)}>
                                  Активный
                                </Badge>
                              </td>
                            ) : (
                              <td>
                                <Badge color={getBadge(delivery.active)}>
                                  Не активный
                                </Badge>
                              </td>
                            )}
                             <td>
                              <UpdateDeleteDeliveries function={this.getCouriers} id={delivery.id} />
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

export default Deliveries;
