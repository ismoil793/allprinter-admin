import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Pagination,
  Label,
  Input,
  FormGroup,
  Form
} from "reactstrap";
import { PaginationLink, PaginationItem } from "reactstrap";
import { httpGet } from "../../api";

import UserBtn from "./components/UserButton";

// function UserRow(props) {
//   const user = props.user;
//   const userLink = `/icons/${user.id}`;

//   const getBadge = status => {
//     return status === "Активный"
//       ? "success"
//       : status === "Заблокирован"
//       ? "danger"
//       : "primary";
//   };

//   return (
//     <tr key={user.id.toString()}>
//       <th scope="row">
//         <Link to={userLink}>{user.id}</Link>
//       </th>
//       <td>
//         <Link to={userLink}>{user.name}</Link>
//       </td>
//       <td>{user.registered}</td>
//       <td>{user.role}</td>
//       <td>
//         <Link to={userLink}>
//           <Badge color={getBadge(user.status)}>{user.status}</Badge>
//         </Link>
//       </td>
//       <td>
//         <UserBtn />
//       </td>
//     </tr>
//   );
// }

const getBadge = status => {
  return status === 2
    ? "success"
    : status === 3
      ? "danger"
      : "primary";
};

class UserList extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      search: '',
      stateID: null,
      first: 0,
      last: 10,
      meta: {
        current_page: null,
        last_page: null,
        per_page: 10
      }
    }
  }


  componentDidMount() {
    setTimeout(() => {
      this.getUsers();
    }, 10);
  }

  getUsers = () => {
    httpGet({
      url: "api/admin/user",
      params: {
        search: this.state.search,
        status: this.state.stateID,
        page: this.state.meta.current_page,
        per_page: this.state.meta.per_page,

      }
    })
      .then(response => {
        this.setState({
          users: response.data.data,
          meta: {
            current_page: response.data.meta.current_page,
            last_page: response.data.meta.last_page,
            per_page: response.data.meta.per_page
          }
        })
      })
      .catch(error => {
        console.log(error);
      });


  }


  Pagination = e => {
    const meta = this.state.meta;
    localStorage.setItem('current_page', e)
    meta.current_page = e;

    this.setState({ meta: meta });

    this.getUsers();
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

    this.getUsers();
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

    this.getUsers();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.getUsers();
    });
  };

  render() {
    const { users } = this.state

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
                      <Col md="3">
                        <Label htmlFor="text-input">Статус</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input type="select" name="stateID" value={this.state.stateID} onChange={this.handleChange} id="select">
                          <option value="">Выберите статус</option>
                          <option value="2">Зарегистрирован</option>
                          <option value="0">Не Зарегистрирован</option>
                          <option value="3">Заблокирован</option>
                        </Input>
                      </Col>
                    </FormGroup>
                  </Row>
                </Form>
              </CardBody>

            </Card>
          </Col>

          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Пользователи{" "}
                <small className="text-muted">MarketPlace</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">ФИО</th>
                      <th scope="col">Зарегистрировался</th>
                      <th scope="col">Телефонный номер</th>
                      <th scope="col">Статус</th>
                      <th scope="col">Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users ? users.map(user => (
                      <tr key={user.id}>
                        <th scope="row">
                          {user.id}
                        </th>
                        <td>
                          {user.first_name} {user.last_name}
                        </td>
                        <td>{user.created_at}</td>
                        <td>{user.phone}</td>
                        {user.status === 2 ?
                          (
                            <td>
                              <Link to={`/clients/${user.id}`}>
                                <Badge color={getBadge(user.status)}>Зарегистрирован</Badge>
                              </Link>
                            </td>
                          ) :
                          (
                            <td>
                              <Link to={`/clients/${user.id}`}>
                                <Badge color={getBadge(user.status)}>Не  Зарегистрирован</Badge>
                              </Link>
                            </td>
                          )

                        }

                        <td>
                          <UserBtn function={this.getUsers} id={user.id} />
                        </td>
                      </tr>
                    )) : null}
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

export default UserList;
