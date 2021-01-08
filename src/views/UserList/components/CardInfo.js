import React, { Component } from 'react';
import { httpGet, httpPost } from "../../../api";
import { Notyf } from "notyf";

import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';

class CardInfo extends Component {
  state = {
    user: {},
    first_name: undefined,
    last_name: undefined,
    phone: undefined,
    user_link: undefined,
    email: undefined,
    collapse: true,
    fadeIn: true,
    modalStatus: false,
    links: []
  };

  componentDidMount(){
    httpGet({
      url: "api/admin/user",
      params: {
       user_id: this.props.id
      }
    })
      .then(response => { 
        this.setState({
          user: response.data.data,
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
          phone: response.data.data.phone,
          email: response.data.data.email,
          user_link: response.data.data.user_link !== null ? response.data.data.user_link.name : undefined
        })
      })
      .catch(error => {
        console.log(error);
      });

    httpGet({ url: "api/admin/user_links" })
      .then(response => {
        this.setState({
          links: response.data.data
       });
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggleModal = () => {
    this.setState({ modalStatus: !this.state.modalStatus });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleModalSubmit = (e) => {
    e.preventDefault();
    const notyf = new Notyf();
    const formData = new FormData();

    if (this.state.first_name !== undefined) formData.append("first_name", this.state.first_name);
    if (this.state.last_name !== undefined) formData.append("last_name", this.state.last_name);
    if (this.state.phone !== undefined) formData.append("phone", this.state.phone);
    if (this.state.email !== undefined) formData.append("email", this.state.email);
    if (this.state.user_link !== undefined) formData.append("user_link", this.state.user_link) ;

    httpPost({
      url: `api/admin/user/update/${this.state.user.id}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(response => {
      notyf.success(`Вы изменили информацию о пользователе `);
      // this.setState({ order: response.data.data });
      this.setState({modalStatus: false});
      httpGet({
        url: "api/admin/user",
        params: {
         user_id: this.props.id
        }
      })
        .then(response => { 
          this.setState({
            user: response.data.data,
            first_name: response.data.data.first_name,
            last_name: response.data.data.last_name,
            phone: response.data.data.phone,
            email: response.data.data.email,
            user_link: response.data.data.user_link
          })
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const {
      user,
      first_name,
      last_name,
      phone,
      email,
      user_link
    } = this.state

    return (
      <Card>
        <CardHeader>
          <Row className="d-flex justify-content-between">
            <Col className="col-auto">
              <i className="fa fa-align-justify"></i> <strong className="ml-2">Главная Информация </strong>
            </Col>
            <Col className="col col-md-auto">
              <Button
                color="info"
                size="sm"
                onClick={this.toggleModal}
                className="mr-1"
              >
                Изменить
              </Button>
              <Modal
                isOpen={this.state.modalStatus}
                toggle={this.toggleModal}
                className={"modal-info " + this.props.className}
              >
                <ModalHeader toggle={this.toggleModal}>
                  Изменить информацию
                </ModalHeader>
                <Form onSubmit={this.handleModalSubmit}>
                  <ModalBody>
                  <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Имя</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input
                        type="text"
                        required
                        value={first_name}
                        name="first_name"
                        onChange={this.handleChange}
                      />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Фамилия</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input
                        type="text"
                        required
                        value={last_name}
                        name="last_name"
                        onChange={this.handleChange}
                      />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Номер Телефона</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input
                        type="text"
                        required
                        value={phone}
                        name="phone"
                        onChange={this.handleChange}
                      />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Email</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input
                        type="email"
                        value={email}
                        name="email"
                        onChange={this.handleChange}
                      />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Переход на сайт</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          onChange={this.handleChange}
                          type="select"
                          name="user_link"
                          value={user_link}
                          id="select"
                        >
                          <option value="">Выберите вид перехода</option>
                          {this.state.links
                            ? this.state.links.map(link => (
                                <option value={link.name}>
                                  {link.name}
                                </option>
                              ))
                            : null}
                            <option value="Другой">
                                  Другой
                                </option>
                        </Input>
                        <hr/>
                      {this.state.link_name === 'Другой' ? (
                          <Input
                          type="text"
                          value={this.state.other_link}
                          name="other_link"
                          onChange={this.handleChange}
                        />
                      ): null}

                      </Col>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      type="submit"
                      color="primary"
                    >
                    Сохранить
                    </Button>{" "}
                    <Button color="secondary" onClick={this.toggleModal}>
                      Закрыть
                    </Button>
                  </ModalFooter>
                </Form>
              </Modal>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <ListGroup>
            <ListGroupItem>
              <b>Имя:</b> {user.first_name}
            </ListGroupItem>
            <ListGroupItem>
              <b>Фамилия:</b> {user.last_name}
            </ListGroupItem>
            <ListGroupItem>
              <b>Номер телефона:</b> +{user.phone}
            </ListGroupItem>
            <ListGroupItem>
              <b>Долг:</b> {Number(user.debt_price).toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум
            </ListGroupItem>
            <ListGroupItem>
              <b>Дата регистрации:</b> {user.created_at}
            </ListGroupItem>
            <ListGroupItem>
              <b>Последнее обновление:</b> {user.logged_at}
            </ListGroupItem>
            <ListGroupItem>
              <b>Статус:</b> {user.status === 1 ? (
                                                    <Badge color="danger"> Не Зарегистрирован</Badge>
                                                  ) : (
                                                    <Badge color="success">
                                                      Зарегистрирован
                                                    </Badge>
                                                  )}
            </ListGroupItem>
            <ListGroupItem>
              <b>Email:</b> {user.email}
            </ListGroupItem>
            <ListGroupItem>
              <b>Переход с площадок:</b> {user.user_link ? user.user_link.name : 'Неизвестно'}
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

export default CardInfo;
