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
import { httpGet } from "../../api";
import UpdateDelete from "./taskbutton";
// import UpdateDeleteBrands from "./deleteBrands";

class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      carrier: [],
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
      this.getTasks();
  }



  getTasks = () => {
      httpGet({
        url: "/api/admin/task",
        params: {
          search: this.state.search,
          page: this.state.meta.current_page,
          per_page: this.state.meta.per_page
        }
      })
      .then(response => {
        this.setState({
          tasks: response.data.data,
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

    this.getTasks();
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

    this.getTasks();
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

    this.getTasks();
  };

  handleChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value }, () => {
      setTimeout(() => {
        this.getTasks();
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
          this.getTasks();
        }, 100);
      }
    );
  };

  render() {
    const { tasks } = this.state;
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
                    <i className="fa fa-align-justify"></i> Задачи
                  </div>
                  <div className="col-auto">
                    <Link to='/task/add'>
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
                      <th>С</th>
                      <th>По</th>
                      <th>Выполнен</th>
                      <th>Курьер</th>
                      <th>Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks  
                      ? tasks.map(task => (
                          <tr>
                            <td>{task.id}</td>
                            <td>{task.name}</td>
                            <td>{task.description}</td>
                            <td>{task.created_at}</td>
                            <td>{task.until}</td>
                            <td>{task.completed_at ? task.completed_at : "Не выполнен" }</td>
                            <td>{task.carrier ? task.carrier.first_name + " " + task.carrier.last_name : null}</td>

                          
                            <td>
                              {/* <UpdateDeleteBrands  /> */}
                              <UpdateDelete function={this.getTasks} id={task.id}/>
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

export default Tasks;