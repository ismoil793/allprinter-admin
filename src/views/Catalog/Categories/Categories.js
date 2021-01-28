import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row
} from "reactstrap";
import { Table } from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";
import CategorySwitchExample from "./components/SwitchButton";
import { httpGet } from "../../../api";
import ActionButtonDelete from "./DeleteUpdateCategories";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.state = {
      categories: [],
      search: '',
      status: null,
      accordion: [true, false, false],
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
      this.getCategories();
    }, 10);
  }

  getCategories = () => {
    httpGet({
      url: "api/admin/category",
      params: {
        page: this.state.meta.current_page,
        per_page: this.state.meta.per_page,

        search: this.state.search,
        active: this.state.status
      }
    })
      .then(response => {
        this.setState({
          categories: response.data.data,
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

    this.getCategories();
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
    let newPaging = paging.length > 35 ? paging.slice(this.state.first, this.state.last) : paging
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

    this.getCategories();
  };


  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  handleChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value }, () => {
      setTimeout(() => {
        this.getCategories();
      }, 100);
    });
  };

  Reset = () => {
    this.setState({
      search: '',
      status: null
    }, () => {
      this.getCategories();
    });
  }

  render() {
    const { categories } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <strong>Фильтры</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <Row>
                    <FormGroup column>
                      <Col md="12">
                        <Label htmlFor="text-input">Поиск</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input type="text" id="text-input" name="search" value={this.state.search} onChange={this.handleChange} placeholder="" />

                      </Col>
                    </FormGroup>

                    <FormGroup column>
                      <Col md="3">
                        <Label htmlFor="text-input">Статус</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input type="select" name="status" value={this.state.status} onChange={this.handleChange} id="select">
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

                <Button onClick={this.Reset} type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Сбросить</Button>
              </CardFooter>
            </Card>
          </Col>

          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <div className="row d-flex align-items-center justify-content-between">
                  <div className="col-auto">
                    <i className="fa fa-align-justify"></i> Категории
                </div>
                  <div className="col-auto">
                    <Link to='/catalog/categories/add'>
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
                      <th>Под категории</th>
                      {/*<th>Показывать</th>*/}
                      <th>На главной</th>
                      <th>В меню</th>
                      <th>Позиция</th>
                      <th>Действие</th>
                    </tr>
                  </thead>
                  <tbody>

                    {categories
                      ? categories.map(category => (

                        <tr>
                          <td>{category.id}</td>
                          <td>{category.name.ru}</td>
                          <td>{category.child_count}</td>
                          {/*<td>*/}
                          {/*  <CategorySwitchExample active={category.active} id={category.id} />*/}
                          {/*</td>*/}
                          <td>
                            <CategorySwitchExample
                              active={category.main_menu_visible}
                              type={"main_menu_visible"}
                              id={category.id}
                            />
                          </td>
                          <td>
                            <CategorySwitchExample
                              active={category.menu_visible}
                              type={"menu_visible"}
                              id={category.id}
                            />
                          </td>
                          <td> 1</td>
                          <td>
                            <ActionButtonDelete function={this.getCategories} id={category.id} />
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

export default Categories;
