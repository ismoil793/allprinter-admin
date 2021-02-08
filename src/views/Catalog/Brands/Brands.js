import React, { Component } from "react";
import { Link } from "react-router-dom"

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
import { httpGet } from "../../../api";
import UpdateDeleteBrands from "./deleteBrands";

class Brands extends Component {
  constructor() {
    super();
    this.state = {
      brands: [],
      search: "",
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
      this.getBrands();
    }, 100);
  }

  getBrands = () => {
    httpGet({
      url: "/api/admin/brand",
      params: {
        search: this.state.search,
        page: this.state.meta.current_page,
        per_page: this.state.meta.per_page
      }
    })
      .then(response => {
        this.setState({
          brands: response.data.data,
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

    this.getBrands();
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

    this.getBrands();
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

    this.getBrands();
  };

  handleChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value }, () => {
      setTimeout(() => {
        this.getBrands();
      }, 100);
    });
  };

  Reset = () => {
    this.setState(
      {
        search: ""
      },
      () => {
        setTimeout(() => {
          this.getBrands();
        }, 100);
      }
    );
  };

  render() {
    const { brands } = this.state;
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
                    <i className="fa fa-align-justify"></i> Бренды
                  </div>
                  <div className="col-auto">
                    <Link to='/catalog/brands/add'>
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
                      <th>Артикул</th>
                      <th>Изображение</th>
                      <th>Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands
                      ? brands.map(brand => (
                        <tr>
                          <td>{brand.id}</td>
                          <td>{brand.name}</td>
                          <td>{brand.reference}</td>
                          <td>
                            <img style={{ width: "10%" }} alt="brands" src={brand.image} />
                          </td>
                          <td>
                            <UpdateDeleteBrands function={this.getBrands} id={brand.id} />
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

export default Brands;
