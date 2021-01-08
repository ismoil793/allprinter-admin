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
import { httpGet } from "../../../api";
import UpdateDeleteOptionValues from "./DeleteUpdateOptionValues";
import OptionValueSwitchExample from "./switchButton";

class OptionValues extends Component {
  constructor() {
    super();
    this.state = {
      optionvalues: [],
      search: "",
      active: null,
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
      this.getOptionValues();
    }, 100);
  }

  getOptionValues = () => {
      httpGet({
        url: "api/admin/value",
        params: {
          search: this.state.search,
          active: this.state.active,
          page: this.state.meta.current_page,
          per_page: this.state.meta.per_page
        }
      })
      .then(response => {
        this.setState({
          optionvalues: response.data.data,
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

    this.getOptionValues();
  };

  createPaging = () => {
    let paging = [];

    for (let i = 1; i <= this.state.meta.last_page; i++) {
      if(this.state.meta.current_page === i){
        paging.push(
          <PaginationItem active key={i} onClick={() => this.Pagination(i)}>
            <PaginationLink tag="button">{i}</PaginationLink>
          </PaginationItem>
        )
      }else{
        paging.push(
          <PaginationItem key={i} onClick={() => this.Pagination(i)}>
            <PaginationLink tag="button">{i}</PaginationLink>
          </PaginationItem>
        )
      }

      }
    
      return paging.slice(this.state.first, this.state.last);
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

    this.getOptionValues();
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

    this.getOptionValues();
  };

  handleChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value }, () => {
      setTimeout(() => {
        this.getOptionValues();
      }, 300);
    });
  };

  Reset = () => {
    this.setState(
      {
        search: "",
        status: null
      },
      () => {
        this.getOptionValues();
      }
    );
  };

  render() {
    const { optionvalues } = this.state;

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
                        <Label htmlFor="text-input">Статус</Label>
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
                    <i className="fa fa-align-justify"></i> Значение характеристик
                  </div>
                  <div className="col-auto">
                    <Link to='/catalog/optionvalues/add'>
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
                      <th>Feature ID</th>
                      <th>Наименование</th>
                      <th>Характеристика</th>
                      <th>К-во продуктов</th>
                      <th>Показывать</th>
                      <th>Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {optionvalues
                      ? optionvalues.map(option => (
                          <tr>
                            <td>{option.id}</td>
                            <td>{option.name.ru}</td>
                            <td>{option.feature.name.ru}</td>
                            <td>{option.product_count}</td>
                            <td>
                             <OptionValueSwitchExample active={option.active} id={option.id}/>
                            </td>
                            <td>
                              <UpdateDeleteOptionValues function={this.getOptionValues} id={option.id} />
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

export default OptionValues;