import React, { Component } from "react";
import {
  Badge,
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
import { httpGet } from "../../../api";
import { Link } from "react-router-dom";
import UpdateDeleteProducts from "../Products/ProductButtons";

class NewProducts extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      min_price: null,
      product_code: '',
      max_price: null,
      search: "",
      stateID: null,
      first: 0,
      last: 10,
      meta: {
        current_page: null,
        last_page: null,
        per_page: 50,
        total: null
      }
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.getProduct();
    }, 100);
  }

  getProduct = () => {
    httpGet({
      url: "api/admin/product",
      params: {
        newly: 1,
        search: this.state.search,
        min_price: this.state.min_price,
        max_price: this.state.max_price,
        status: this.state.stateID,
        page: this.state.meta.current_page,
        per_page: this.state.meta.per_page
      }
    })
      .then(response => {
        this.setState({
          products: response.data.data,
          meta: {
            current_page: 1,
            last_page: response.data.meta.last_page,
            per_page: response.data.meta.per_page,
            total: response.data.meta.total
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

    this.getProduct();
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

    this.getProduct();
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

    this.getProduct();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      setTimeout(() => {
        this.getProduct();
      }, 100);
    });
  };

  Reset = () => {
    this.setState({
      search: "",
      min_price: null,
      max_price: null,
      stateID: null
    });
  };

  render() {
    const { products } = this.state;

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
                      <Col md="12">
                        <Label htmlFor="text-input">Мин цена</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input
                          type="text"
                          id="text-input"
                          name="min_price"
                          value={this.state.min_price}
                          onChange={this.handleChange}
                          placeholder=""
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
                          onChange={this.handleChange}
                          placeholder=""
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup column>
                      <Col md="3">
                        <Label htmlFor="text-input">Статус</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input
                          type="select"
                          name="stateID"
                          value={this.state.stateID}
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
                    <i className="fa fa-align-justify"></i>Новые продукты: {this.state.meta.total}
                  </div>
                  <div className="col-auto">
                    <Link to='/goods/products/add'>
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
                      <th>Фото</th>
                      <th>Имя</th>
                      <th>Категории</th>
                      <th>К-во</th>
                      <th>Цена</th>
                      <th>Статус</th>
                      <th>Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      ? products.map(product => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>
                            <img
                              style={{ width: "50%" }}
                              alt={product.model}
                              src={
                                product.images && product.images.length
                                  ? product.images[0].types.small_default
                                  : null
                              }
                            />
                          </td>
                          <td>{product.name} </td>
                          <td>
                            {product.categories.map(
                              (name, index) => (index ? ", " : "") + name.name
                            )}
                          </td>
                          <td>{product.all_quantity}</td>
                          <td> {product.min_price} сум</td>
                          <td>
                            {product.active ? (
                              <Badge color="success">Активный</Badge>
                            ) : (
                                <Badge color="danger">Не активный</Badge>
                              )}
                          </td>
                          <td>
                            <UpdateDeleteProducts id={product.id} />
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

export default NewProducts;
