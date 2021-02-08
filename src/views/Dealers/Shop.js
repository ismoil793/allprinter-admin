import React, { Component } from "react";
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
// import SplitButton from "../Charts/components/SplitButton";
import { httpGet } from "../../api";
import { Link } from "react-router-dom";
import UpdateDeleteShops from "./components/ShopButton";

class Shops extends Component {
  constructor() {
    super();
    this.state = {
      shops: [],
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
      this.getShops();
    }, 10);
  }

  getShops = () => {
    httpGet({
      url: "api/admin/dealer/shops",
      params: {
        search: this.state.search,
        type: "new",
        page: this.state.meta.current_page,
        per_page: this.state.meta.per_page
      }
    })
      .then(response => {
        this.setState({
          shops: response.data.data,
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

    this.getShops();
  };

  createPaging = () => {
    let paging = [];

    for (let i = 1; i <= this.state.meta.last_page; i++) {
      if (this.state.meta.current_page === i) {
        paging.push(
          <PaginationItem active key={i} onClick={() => this.Pagination(i)}>
            <PaginationLink tag="button">{i}</PaginationLink>
          </PaginationItem>
        )
      } else {
        paging.push(
          <PaginationItem key={i} onClick={() => this.Pagination(i)}>
            <PaginationLink tag="button">{i}</PaginationLink>
          </PaginationItem>
        )
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
      this.setState({ meta: meta });
    } else {
      this.setState({ meta: meta });
    }

    this.getShops();
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

    this.getShops();
  };

  handleChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.getShops();
    });
  };

  render() {
    const { shops } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <Form>
                <CardHeader>
                  <strong>Фильтры</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <FormGroup column>
                      <Col md="3">
                        <Label htmlFor="text-input">Поиск</Label>
                      </Col>

                      <Col xs="12" md="12">
                        <Input
                          type="text"
                          id="text-input"
                          onChange={this.handleChange}
                          name="search"
                          value={this.state.search}
                          placeholder=""
                        />
                      </Col>
                    </FormGroup>

                  </Row>
                </CardBody>
              </Form>
            </Card>
          </Col>

          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="12" lg="2">

                  </Col>
                  <Col xs="12" lg="7"></Col>
                </Row>
                <div className="row d-flex align-items-center justify-content-between">
                  <div className="col-auto">
                    <i className="fa fa-align-justify"></i> Таблица Торговых площадок
                  </div>
                  <div className="col-auto">
                    <Link to='/suppliers/shops/add'>
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
                      <th>Артикул</th>
                      <th>Наименование</th>
                      <th>Количество</th>
                      <th>Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shops
                      ? shops.map(shop => (
                        <tr>
                          <td>{shop.id}</td>
                          <td>
                            {shop.reference ? shop.reference : "Нет артикула"}
                          </td>
                          {shop.name ? <td> {shop.name} </td> : <td></td>}
                          <td>{shop.item_count}</td>

                          {
                            shop.status === 1 ?
                              <td> <Badge color="success">Работает</Badge></td>
                              : (shop.status === 0 ?
                                <td><Badge color="warning">Не работает</Badge></td>
                                : (shop.status === 3 ? <td><Badge color="warning">Другое</Badge></td> : null))}
                          <td><UpdateDeleteShops id={shop.id} function={this.getShops} /></td>
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

export default Shops;
