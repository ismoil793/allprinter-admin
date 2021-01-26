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
import UpdateDeleteProducts from "./ProductButtons";
import { Link } from "react-router-dom";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      shops: [],
      categories: [],
      pshopID: localStorage.getItem("pshopID")
        ? localStorage.getItem("pshopID")
        : "",
      pcategoryID: localStorage.getItem("pcategoryID")
        ? localStorage.getItem("pcategoryID")
        : "",
      pmin_price: localStorage.getItem("pmin_price")
        ? localStorage.getItem("pmin_price")
        : "",
      pmax_price: localStorage.getItem("pmax_price")
        ? localStorage.getItem("pmax_price")
        : "",
      psearch: localStorage.getItem("psearch")
        ? localStorage.getItem("psearch")
        : "",
      pstateID: localStorage.getItem("pstateID")
        ? localStorage.getItem("pstateID")
        : "",
      first: 0,
      last: 10,
      pdiscount: localStorage.getItem("pdiscount")
        ? localStorage.getItem("pdiscount")
        : "",
      meta: {
        current_page: null,
        last_page: null,
        per_page: 40,
        total: null
      }
    };
  }
  componentDidMount() {
    httpGet({
      url: "api/admin/dealer/shops", params: {
        per_page: 1000
      }
    })
      .then(response => {
        this.setState({
          shops: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    httpGet({
      url: "api/admin/category",
      params: {
        parent_id: null
      }
    })
      .then(response => {
        this.setState({
          categories: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    setTimeout(() => {
      this.getProduct();
    }, 100);
  }

  getProduct = () => {
    httpGet({
      url: "api/admin/product",
      params: {
        search: this.state.psearch,
        min_price: this.state.pmin_price,
        max_price: this.state.pmax_price,
        status: this.state.pstateID,
        page: this.state.meta.current_page
          ? this.state.meta.current_page
          : localStorage.getItem("current_page"),
        per_page: this.state.meta.per_page,
        shop_id: this.state.pshopID,
        category_id: this.state.pcategoryID,
        discount: this.state.pdiscount
      }
    })
      .then(response => {
        this.setState({
          products: response.data.data,
          meta: {
            current_page: response.data.meta.current_page,
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
    localStorage.setItem("current_page", e);
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
    localStorage.setItem(`${[e.target.name]}`, e.target.value);
    localStorage.setItem("current_page", 1);
    this.setState(
      {
        [e.target.name]: e.target.value,
        meta: {
          current_page: 1
        }
      },
      () => {
        setTimeout(() => {
          this.getProduct();
        }, 100);
      }
    );
  };

  Reset = () => {
    localStorage.setItem("psearch", "");
    localStorage.setItem("pmin_price", "");
    localStorage.setItem("pmax_price", "");
    localStorage.setItem("pstateID", "");
    localStorage.setItem("pshopID", "");
    localStorage.setItem("pcategoryID", "");
    localStorage.setItem("pdiscount", "");

    this.setState(
      {
        psearch: "",
        pmin_price: "",
        pmax_price: "",
        pstateID: "",
        pshop_id: "",
        pdiscount: "",
        pcategoryID: ""
      },
      () => {
        this.getProduct();
      }
    );
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
                          name="psearch"
                          value={this.state.psearch}
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
                          name="pmin_price"
                          value={this.state.pmin_price}
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
                          name="pmax_price"
                          value={this.state.pmax_price}
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
                          name="pstateID"
                          value={this.state.pstateID}
                          onChange={this.handleChange}
                          id="select"
                        >
                          <option value=""> Выберите статус </option>

                          <option value="1">Активный</option>
                          <option value="0">Не активный</option>
                          <option value="2">Архив</option>
                        </Input>
                      </Col>
                    </FormGroup>

                    <FormGroup column>
                      <Col md="3">
                        <Label htmlFor="text-input">Скидки</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input
                          type="select"
                          name="pdiscount"
                          value={this.state.pdiscount}
                          onChange={this.handleChange}
                          id="select"
                        >
                          <option value=""> Выберите статус </option>

                          <option value="1">Да</option>
                          <option value="0">Нет</option>
                        </Input>
                      </Col>
                    </FormGroup>

                    <FormGroup column>
                      <Col md="3">
                        <Label htmlFor="text-input">Дилеры</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input
                          type="select"
                          name="pshopID"
                          value={this.state.pshopID}
                          onChange={this.handleChange}
                          id="select"
                        >
                          <option value=""> Выберите дилера </option>
                          {this.state.shops
                            ? this.state.shops.map(shop => (
                              <option value={shop.id}>{shop.name}</option>
                            ))
                            : null}
                        </Input>
                      </Col>
                    </FormGroup>

                    <FormGroup column>
                      <Col md="3">
                        <Label htmlFor="text-input">Категории</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input
                          type="select"
                          name="pcategoryID"
                          value={this.state.pcategoryID}
                          onChange={this.handleChange}
                          id="select"
                        >
                          <option value=""> Выберите категорию </option>
                          {this.state.categories
                            ? this.state.categories.map(category => (
                              <option value={category.id}>
                                {category.name ? category.name.ru : null}
                              </option>
                            ))
                            : null}
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
                    <i className="fa fa-align-justify"></i> Продукты: {this.state.meta.total}
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
                          <td style={{ width: '10%' }}>
                            <img
                              style={{ width: "55%" }}
                              alt={product.model}
                              src={
                                product.images && product.images.length
                                  ? product.images[0].url
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
                            {product.active === 1 ? (
                              <Badge color="success">Активный</Badge>
                            ) : product.active === 2 ? (
                              <Badge color="warning">Архив</Badge>
                            ) : (
                                  <Badge color="danger">Не активный</Badge>
                                )}
                          </td>
                          <td>
                            <UpdateDeleteProducts
                              function={this.getProduct}
                              id={product.id}
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

export default Products;
