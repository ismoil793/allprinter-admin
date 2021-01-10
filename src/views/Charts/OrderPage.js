import React, {Component} from "react";
import {httpGet, httpPost, httpDelete} from "../../api";
import {Notyf} from "notyf";
import {Link} from "react-router-dom";
import "notyf/notyf.min.css";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table
} from "reactstrap";

import EditItems from "./components/EditItem";
import DeleteItem from "./components/DeleteButton";
import SearchItems from "./components/Search";
import ComportalItem from "./components/ComfortalButton";

class OrderPage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      items: [],
      stateID: null,
      states: [],
      order: [],
      filtered_order: [],

      collapse: true,
      fadeIn: true,
      timeout: 300,
      discount: null,
      info: false,
      primary: false,
      warning: false,
      success: false,
      small: false,

      payments: [],
      deliveries: [],
      paymentID: null,
      deliveryID: null,

      full_name: "",
      address: "",
      phone: "",
      regions: [],
      regionID: null,
      cities: [],
      cityID: null,
      selecteditem: null,
      quantity: "",
      deduction_price: null,
      user_phone: "",
      first_name: "",
      last_name: "",
      links: [],
      link_name: "",
      other_link: "",
      comment: "",
      admin_comment: ""
    };
    this.toggleInfo = this.toggleInfo.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.toggleWarning = this.toggleWarning.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleSmall = this.toggleSmall.bind(this);
  }

  toggleInfo() {
    this.setState({
      info: !this.state.info
    });
  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary
    });
  }

  toggleWarning() {
    this.setState({
      warning: !this.state.warning
    });
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success
    });
  }

  toggleSmall() {
    this.setState({
      small: !this.state.small
    });
  }

  componentWillMount() {
    var order_id = parseInt(this.props.location.pathname.match(/\d+$/)[0]);
    localStorage.setItem("order_id", order_id);
  }

  deleteItem(e) {
    const notyf = new Notyf();

    httpDelete({
      url: `api/admin/order/item/remove/${localStorage.getItem("order_id")}`,
      data: {
        item_shop_id: e.target.id
      }
    })
      .then(response => {
        notyf.error("Вы удалили товар с заказа");
        this.props.function();
      })
      .catch(error => {
        console.log(error);
      });
  }

  ItemCallbackFunction = childData => {
    this.setState({selecteditem: childData});
  };

  componentDidMount() {
    httpGet({url: "api/admin/user_links"})
      .then(response => {
        this.setState({
          links: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    httpGet({
      url: "api/order/deliveries",
      params: {
        for: "admin"
      }
    })
      .then(response => {
        this.setState({
          deliveries: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    httpGet({
      url: "api/regions",
      params: {
        city_id: this.state.cityID
      }
    })
      .then(response => {
        this.setState({regions: response.data.data});
      })
      .catch(error => {
        console.log(error);
      });

    httpGet({url: "api/order/payments"})
      .then(response => {
        this.setState({
          payments: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    httpGet({
      url: "api/order/states",
      params: {
        for: "admin"
      }
    })
      .then(response => {
        this.setState({
          states: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    // ***************   Fetching Cities from Back-end   *************** //

    httpGet({url: "api/cities"})
      .then(response => {
        this.setState({cities: response.data.data});
      })
      .catch(error => {
        console.log(error);
      });

    this.getOrder();
  }

  getOrder = e => {
    httpGet({
      url: "api/admin/order",
      params: {
        order_id: localStorage.getItem("order_id")
      }
    })
      .then(response => {
        let items = response.data.data.cart.items;
        let filtered = [];
        for (let i = 0; i < items.length; i++) {
          if (items[i].product_code) {
            filtered.push({
              name: items[i].product.name,
              product_id: items[i].product.id,
              item_shop_id: items[i].item_shop_id,
              images: items[i].product.images[0].types.small_default,
              shop_name: items[i].shop.name,
              comportal_sended: items[i].comportal_sended,
              reference: items[i].reference,
              shop_reference: items[i].shop_reference,
              product_code: items[i].product_code,
              quantity: items[i].quantity,
              brandstore_quantity: items[i].brandstore_quantity
            });
          }
        }

        this.setState({
          order: response.data.data,
          filtered_order: filtered,
          stateID: response.data.data.state.id,
          full_name: response.data.data.address.full_name,
          address: response.data.data.address.address,
          phone: response.data.data.address
            ? response.data.data.address.phone
            : "",
          user_phone: response.data.data.user
            ? response.data.data.user.phone
            : "",
          first_name: response.data.data.user
            ? response.data.data.user.first_name
            : "",
          last_name: response.data.data.user
            ? response.data.data.user.last_name
            : "",
          link_name:
            response.data.data.user && response.data.data.user.user_link
              ? response.data.data.user.user_link.name
              : "",
          comment: response.data.data.comment,
          admin_comment: response.data.data.admin_comment,
          cityID: response.data.data.address.region
            ? response.data.data.address.region.city.id
            : null,
          regionID: response.data.data.address.region
            ? response.data.data.address.region.id
            : null,
          deliveryID: response.data.data.delivery
            ? response.data.data.delivery.id
            : null,
          paymentID: response.data.data.payment
            ? response.data.data.payment.id
            : null
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  AddItem = e => {
    const notyf = new Notyf();
    let formData = new FormData();

    if (this.state.selecteditem) {
      formData.append("item_shop_id", this.state.selecteditem);
    }

    if (this.state.quantity) {
      formData.append("quantity", this.state.quantity);
    }

    if (this.state.deduction_price) {
      formData.append("deduction_price", this.state.deduction_price);
    }

    e.preventDefault();

    httpPost({
      url: `api/admin/order/item/add/${localStorage.getItem("order_id")}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        notyf.success(`Вы изменили заказ `);
        this.setState({order: response.data.data});
      })
      .catch(error => {
        console.log(error);
      });
  };

  ChangeUser = e => {
    const notyf = new Notyf();
    let formData = new FormData();

    if (this.state.first_name) {
      formData.append("first_name", this.state.first_name);
    }

    if (this.state.last_name) {
      formData.append("last_name", this.state.last_name);
    }

    if (this.state.user_phone) {
      formData.append("phone", this.state.user_phone);
    }

    if (this.state.other_link) {
      formData.append("user_link", this.state.other_link);
    } else {
      formData.append("user_link", this.state.link_name);
    }

    e.preventDefault();

    httpPost({
      url: `api/admin/user/update/${this.state.order.user.id}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        notyf.success(`Вы изменили информацию о пользователе `);
        // this.setState({ order: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  SubmitHandler = e => {
    const notyf = new Notyf();
    let formData = new FormData();
    formData.append("order_state_id", this.state.stateID);

    e.preventDefault();

    httpPost({
      url: `api/admin/order/state/update/${localStorage.getItem("order_id")}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        notyf.success("Вы обновили статус заказа");
        this.setState({order: response.data.data});
      })
      .catch(error => {
        console.log(error);
      });
  };

  SubmitComportal = e => {
    const notyf = new Notyf();
    let formData = new FormData();
    formData.append("order_state_id", this.state.stateID);

    e.preventDefault();

    httpPost({
      url: `api/admin/order/state/update/${localStorage.getItem("order_id")}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        notyf.success("Вы обновили статус заказа");
        this.setState({order: response.data.data});
      })
      .catch(error => {
        console.log(error);
      });
  };

  GetRegion = e => {
    e.preventDefault();

    let regionId = e.target.value;

    httpGet({
      url: "api/regions",
      params: {
        city_id: regionId
      }
    })
      .then(response => {
        this.setState({regions: response.data.data});
      })
      .catch(error => {
        console.log(error);
      });
  };

  UpdateOrder = e => {
    const notyf = new Notyf();
    let formData = new FormData();

    if (this.state.discount) {
      formData.append("discount", this.state.discount);
    }

    if (this.state.deliveryID) {
      formData.append("delivery_id", this.state.deliveryID);
    }

    if (this.state.paymentID) {
      formData.append("payment_id", this.state.paymentID);
    }
    if (this.state.full_name) {
      formData.append("address[full_name]", this.state.full_name);
    }
    if (this.state.address) {
      formData.append("address[address]", this.state.address);
    }
    if (this.state.phone) {
      formData.append("address[phone]", this.state.phone);
    }
    if (this.state.regionID) {
      formData.append("address[region_id]", this.state.regionID);
    }

    if (this.state.admin_comment) {
      formData.append("admin_comment", this.state.admin_comment);
    }

    e.preventDefault();

    httpPost({
      url: `api/admin/order/update/${localStorage.getItem("order_id")}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        notyf.success(`Вы изменили заказ `);
        this.setState({order: response.data.data});
      })
      .catch(error => {
        console.log(error);
      });
  };

  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  toggleFade() {
    this.setState(prevState => {
      return {fadeIn: !prevState};
    });
  }

  render() {
    const {order, states} = this.state;
    console.log(this.state.filtered_order);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12" xl="4">
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="12" md="1">
                    <i className="fa fa-align-justify"></i>
                  </Col>

                  <Col xs="12" md="7">
                    <strong>Информация о Заказе</strong>
                  </Col>
                  <Col xs="12" md="4">
                    <Button
                      color="info"
                      size="sm"
                      onClick={this.toggleInfo}
                      className="mr-1"
                    >
                      Изменить
                    </Button>
                    <Modal
                      isOpen={this.state.info}
                      toggle={this.toggleInfo}
                      className={"modal-info " + this.props.className}
                    >
                      <ModalHeader toggle={this.toggleInfo}>
                        Изменить способы оплаты и доставки
                      </ModalHeader>
                      <Form onSubmit={this.UpdateOrder}>
                        <ModalBody>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="select">Способ доставки</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input
                                onChange={this.handleChange}
                                type="select"
                                name="deliveryID"
                                value={this.state.deliveryID}
                                id="select"
                              >
                                <option value="">
                                  Выберите способ доставки
                                </option>
                                {this.state.deliveries
                                  ? this.state.deliveries.map(delivery => (
                                    <option value={delivery.id}>
                                      {delivery.name}
                                    </option>
                                  ))
                                  : null}
                              </Input>
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="select">Способ оплаты</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input
                                onChange={this.handleChange}
                                type="select"
                                name="paymentID"
                                value={this.state.paymentID}
                                id="select"
                              >
                                <option value="">Выберите способ оплаты</option>
                                {this.state.payments
                                  ? this.state.payments.map(payment => (
                                    <option value={payment.id}>
                                      {payment.name}
                                    </option>
                                  ))
                                  : null}
                              </Input>
                            </Col>
                          </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            type="submit"
                            color="primary"
                            onClick={this.toggleInfo}
                          >
                            Сохранить
                          </Button>{" "}
                          <Button color="secondary" onClick={this.toggleInfo}>
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
                    <b>Дата оформления:</b> {order.created_at}
                  </ListGroupItem>
                  {typeof order.payment == "object" ? (
                    <ListGroupItem>
                      <b>Вид Оплаты:</b>
                      {order.payment.name}
                    </ListGroupItem>
                  ) : null}

                  {order.invoices ? (
                    <ListGroupItem>
                      <Row>
                        {order.invoices.map(invoice => (
                          <Col md="6">
                            <b>{invoice.name}:</b> <br/>
                            {invoice.pivot.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                            сум
                          </Col>
                        ))}
                      </Row>
                    </ListGroupItem>
                  ) : null}

                  {typeof order.delivery == "object" ? (
                    <ListGroupItem>
                      <b>Вид Доставки:</b> {order.delivery.name}
                    </ListGroupItem>
                  ) : null}
                  {typeof order.state == "object" ? (
                    <ListGroupItem>
                      <b>Статус:</b> {order.state.name}
                    </ListGroupItem>
                  ) : null}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="4">
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="12" md="1">
                    <i className="fa fa-align-justify"></i>
                  </Col>

                  <Col xs="12" md="7">
                    <strong>Инфо о Пользователе</strong>
                  </Col>

                  <Col xs="12" md="4">
                    <Button
                      color="success"
                      size="sm"
                      onClick={this.toggleSuccess}
                      className="mr-1"
                    >
                      Изменить
                    </Button>
                    <Modal
                      isOpen={this.state.success}
                      toggle={this.toggleSuccess}
                      className={"modal-success " + this.props.className}
                    >
                      <ModalHeader toggle={this.toggleSuccess}>
                        Изменить информацию о пользователе
                      </ModalHeader>
                      <Form onSubmit={this.ChangeUser}>
                        <ModalBody>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="select">Имя</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input
                                type="text"
                                value={this.state.first_name}
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
                                value={this.state.last_name}
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
                                value={this.state.user_phone}
                                name="user_phone"
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
                                name="link_name"
                                value={this.state.link_name}
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
                                <option value="Другой">Другой</option>
                              </Input>
                              <hr/>
                              {this.state.link_name === "Другой" ? (
                                <Input
                                  type="text"
                                  value={this.state.other_link}
                                  name="other_link"
                                  onChange={this.handleChange}
                                />
                              ) : null}
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="select">Номер Телефона</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input
                                type="text"
                                value={this.state.user_phone}
                                name="user_phone"
                                onChange={this.handleChange}
                              />
                            </Col>
                          </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            type="submit"
                            color="success"
                            onClick={this.toggleSuccess}
                          >
                            Сохранить
                          </Button>{" "}
                          <Button
                            color="secondary"
                            onClick={this.toggleSuccess}
                          >
                            Закрыть
                          </Button>
                        </ModalFooter>
                      </Form>
                    </Modal>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {order.user ? (
                  <ListGroup>
                    <ListGroupItem>
                      <b>ID:</b> {order.user.id}
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>ФИО:</b> {order.user.name ? order.user.name : `${this.state.first_name} ${this.state.last_name}`}
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>Номер
                        телефона:</b> {this.state.user_phone.replace(/^(\d{3})(\d{2})\s*(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5')}
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>Email:</b> {order.user.email}
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>Переход с площадок:</b>{" "}
                      {this.state.link_name
                        ? this.state.link_name
                        : "Надо уточнить"}
                    </ListGroupItem>


                    {
                      order.user && order.user.cashback ?
                        <ListGroupItem>
                          <b>Cashback пользователя:</b> {order.user.cashback.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум
                        </ListGroupItem>
                        :
                        <ListGroupItem>
                          <b>Cashback пользователя:</b> 0 сум
                        </ListGroupItem>
                    }


                  </ListGroup>
                ) : null}
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="4">
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="12" md="1">
                    <i className="fa fa-align-justify"></i>
                  </Col>
                  <Col xs="12" md="7">
                    <strong>Информация о Доставке</strong>
                  </Col>
                  <Col xs="12" md="4">
                    <Button
                      color="primary"
                      onClick={this.togglePrimary}
                      className="mr-1"
                      size="sm"
                    >
                      Изменить
                    </Button>
                    <Modal
                      isOpen={this.state.primary}
                      toggle={this.togglePrimary}
                      className={"modal-primary " + this.props.className}
                    >
                      <ModalHeader toggle={this.togglePrimary}>
                        Изменить Адрес
                      </ModalHeader>
                      <Form onSubmit={this.UpdateOrder}>
                        <ModalBody>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="select">Имя получателя</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input
                                onChange={this.handleChange}
                                type="text"
                                name="full_name"
                                value={this.state.full_name}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="select">Адрес</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input
                                onChange={this.handleChange}
                                type="text"
                                name="address"
                                value={this.state.address}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="select">Номер телефона</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input
                                onChange={this.handleChange}
                                type="text"
                                name="phone"
                                value={this.state.phone}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="select">Выберите Город</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input
                                onChange={this.GetRegion}
                                type="select"
                                name="cityID"
                                value={this.state.cityID}
                                id="select"
                              >
                                <option value="">Выберите город</option>
                                {this.state.cities
                                  ? this.state.cities.map(city => (
                                    <option value={city.id}>
                                      {city.name}
                                    </option>
                                  ))
                                  : null}
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="select">Выберите Регион</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input
                                onChange={this.handleChange}
                                type="select"
                                name="regionID"
                                value={this.state.regionID}
                                id="select"
                              >
                                <option value="">Выберите регион</option>
                                {this.state.regions
                                  ? this.state.regions.map(region => (
                                    <option key={region.id} value={region.id}>
                                      {region.name}
                                    </option>
                                  ))
                                  : null}
                              </Input>
                            </Col>
                          </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            type="submit"
                            color="primary"
                            onClick={this.togglePrimary}
                          >
                            Сохранить
                          </Button>{" "}
                          <Button
                            color="secondary"
                            onClick={this.togglePrimary}
                          >
                            Закрыть
                          </Button>
                        </ModalFooter>
                      </Form>
                    </Modal>
                  </Col>{" "}
                </Row>
              </CardHeader>
              <CardBody>
                {typeof order.address == "object" ? (
                  <ListGroup>
                    <ListGroupItem>
                      <b>Получатель:</b>{" "}
                      {order.address ? order.address.full_name : null}
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>Телефон Получателя:</b>{" "}
                      {order.address ? order.address.phone : null}
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>Город/Регион:</b>{" "}
                      {order.address
                        ? order.address.region
                          ? order.address.region.city.name
                          : null
                        : null}
                      ,{" "}
                      {order.address
                        ? order.address.region
                          ? order.address.region.name
                          : null
                        : null}
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>Адрес:</b>{" "}
                      {order.address ? order.address.address : null}
                    </ListGroupItem>
                  </ListGroup>
                ) : null}
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Заказ № {order.id}
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Артикул</th>
                    <th>Артикул контрагента</th>
                    <th>Изображение</th>
                    <th>Наименование</th>
                    <th>Дилер</th>
                    <th>К-во</th>
                    <th>К-во у BS</th>
                    <th>Цена за ед</th>
                    <th>Общая входня цена</th>
                    <th>Общая розничная цена</th>
                    <th>Маржинальность</th>
                    <th>Действие</th>
                  </tr>
                  </thead>

                  <tbody>
                  {typeof order.cart == "object"
                    ? order.cart.items.map(item => (
                      <tr key={item.item_shop_id}>
                        <td>{item.reference}</td>
                        <td>{item.shop_reference}</td>

                        <td>
                          <img
                            src={item.product.images[0].types.small_default}
                            alt=""
                          />
                        </td>
                        <td>
                          <Link
                            to={{
                              pathname: `/goods/updateproduct/${item.product.id}`,
                              updateproduct_id: item.product.id
                            }}
                          >
                            {item.product.name}
                          </Link>
                        </td>
                        <td>{item.shop.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.brandstore_quantity}</td>
                        <td>
                          {(item.total_with_discount / item.quantity)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                        </td>
                        <td>
                          {item.sum_initial_price ?
                            item.sum_initial_price.toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                            : null
                          }{" "}
                        </td>
                        <td>
                          {item.total_with_discount ?
                            item.total_with_discount.toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                            : null
                          }{" "}
                        </td>

                        <td>
                          {
                            item.total_with_discount ?
                              (item.total_with_discount - item.sum_initial_price).toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                              : null
                          }
                          {" "}
                        </td>

                        <td>
                          <EditItems
                            callback={this.getOrder}
                            item_shop_id={item.item_shop_id}
                            quantity={item.quantity}
                          />
                          <hr/>
                          <DeleteItem
                            callback={this.getOrder}
                            item_shop_id={item.item_shop_id}
                          />
                        </td>
                      </tr>
                    ))
                    : null}
                  </tbody>

                </Table>


                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Общая входная цена</th>
                    <th>Общая розничная цена</th>
                    <th>Маржинальность заказа</th>
                    <th>Потенциальный cashback</th>
                    <th>Использованный cashback</th>
                  </tr>
                  </thead>

                  <tbody>
                  <tr>

                    {console.log(order)}

                    <td>{order.cart && order.cart.sum_initial_price ? order.cart.sum_initial_price.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") : null} сум
                    </td>

                    <td>{order.cart ? order.cart.total_with_discount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") : null} сум
                    </td>
                    <td>{order.cart ? order.cart.marginality : null} сум</td>
                    <td>{order.cart ? order.cart.potential_cashback : null} сум</td>
                    <td>{order.cart ? order.cart.used_cashback : null} сум</td>
                  </tr>
                  </tbody>
                </Table>

                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Общая сумма заказа ( ... )</th>
                    <th>Сумма заказа после применения скидки</th>
                    <th>Основание</th>
                  </tr>
                  </thead>

                  <tbody>
                  <tr>
                    <td>
                      {order.cart
                        ? order.cart.total
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        : null}{" "}
                      сум
                    </td>
                    <td>
                      {order.cart
                        ? order.cart.total_with_discount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        : null}{" "}
                      сум
                    </td>
                    {order.cart ? (
                      <td>
                        {order.cart.used_cashback === 0 &&
                        order.cart.coupon_price !== 0
                          ? "Купон: " + order.cart.coupon_price
                          : order.cart.used_cashback !== 0 &&
                          order.cart.coupon_price === 0
                            ? "Cashback: " + order.cart.used_cashback
                            : "Не использовано"}
                      </td>) : null}
                  </tr>
                  </tbody>
                </Table>

                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Комментарий клиента к заказу</th>
                    <th>
                      Комментарий модератора к заказу{" "}
                      <Button onClick={this.toggleSmall} className="mr-1">
                        Добавить
                      </Button>
                      <Modal
                        isOpen={this.state.small}
                        toggle={this.toggleSmall}
                        className={"modal-lg " + this.props.className}
                      >
                        <ModalHeader toggle={this.toggleSmall}>
                          Добавить комментарий
                        </ModalHeader>
                        <Form onSubmit={this.UpdateOrder}>
                          <ModalBody>
                            <FormGroup row>
                              <Col md="3">
                                <Label htmlFor="select">Примечание</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input
                                  onChange={this.handleChange}
                                  type="text"
                                  name="admin_comment"
                                  value={this.state.admin_comment}
                                />
                              </Col>
                            </FormGroup>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              type="submit"
                              color="primary"
                              onClick={this.toggleSmall}
                            >
                              Сохранить
                            </Button>{" "}
                            <Button
                              color="secondary"
                              onClick={this.toggleSmall}
                            >
                              Отменить
                            </Button>
                          </ModalFooter>
                        </Form>
                      </Modal>{" "}
                    </th>
                  </tr>
                  </thead>

                  <tbody>
                  <tr>
                    <td>
                      {order.comment ? order.comment : "Нет комментарий"}
                    </td>
                    <td>
                      {order.admin_comment
                        ? order.admin_comment
                        : "Нет комментарий"}
                    </td>
                  </tr>
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                <Form onSubmit={this.UpdateOrder}>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Скидка на весь заказ </Label>
                    </Col>
                    <Col xs="12" md="6">
                      <Input
                        type="text"
                        value={this.state.discount}
                        name="discount"
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col xs="12" md="3">
                      <Button type="submit" size="sm" color="primary">
                        <i className="fa fa-dot-circle-o"></i> Подвердить
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardFooter>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
                <strong>Добавить продукт к данному заказу</strong>
              </CardHeader>
              <Form onSubmit={this.AddItem} className="form-horizontal">
                <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Добавить продукт</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <SearchItems itemFunction={this.ItemCallbackFunction}/>
                      {/* <ProductIntegrationReactSelect
                        itemFunction={this.ItemCallbackFunction}
                        items={this.state.items}
                      /> */}
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Количество</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange={this.handleChange}
                        type="text"
                        name="quantity"
                        value={this.state.quantity}
                        id="select"
                      ></Input>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Скидочная цена</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange={this.handleChange}
                        type="text"
                        name="deduction_price"
                        value={this.state.deduction_price}
                        id="select"
                      ></Input>
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> Подвердить
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
                <strong>Платежная ссылка данного заказа</strong>
              </CardHeader>
              <Form onSubmit={this.SubmitHandler} className="form-horizontal">
                <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Линк - Payme/Click </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <a href={order.url ? order.url : null}>
                        {" "}
                        {order.url ? order.url : ""}
                      </a>
                    </Col>
                  </FormGroup>
                </CardBody>
              </Form>
            </Card>
          </Col>

          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
                <strong>Статус заказа</strong>
              </CardHeader>
              <Form onSubmit={this.SubmitHandler} className="form-horizontal">
                <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Статус Заказа</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange={this.handleChange}
                        type="select"
                        name="stateID"
                        value={this.state.stateID}
                        id="select"
                      >
                        {/* <option value="0">Статусы</option> */}
                        {states
                          ? states.map(state => (
                            <option value={state.id}>{state.name}</option>
                          ))
                          : null}
                      </Input>
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> Подвердить
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>

          {this.state.filtered_order && this.state.filtered_order.length > 0 ? (
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Заказ № {order.id}
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                    <tr>
                      <th>Артикул</th>
                      <th>Артикул Контрагента</th>
                      <th>Изображение</th>
                      <th>Наименование</th>
                      <th>Дилер</th>
                      <th>Отправить</th>
                      <th>Изменить</th>
                      <th>Удалить</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.state.filtered_order
                      ? this.state.filtered_order.map(item => (
                        <tr key={item.item_shop_id}>
                          <td>{item.reference}</td>
                          <td>{item.shop_reference}</td>
                          <td>
                            <img src={item.images} alt=""/>
                          </td>
                          <td>
                            <Link
                              to={{
                                pathname: `/goods/updateproduct/${item.product_id}`,
                                updateproduct_id: item.product_id
                              }}
                            >
                              {item.name}
                            </Link>
                          </td>
                          <td>{item.shop_name}</td>
                          {item.comportal_sended === 0 ? (
                            <td>
                              <ComportalItem
                                callback={this.getOrder}
                                item_shop_id={item.item_shop_id}
                              />
                            </td>
                          ) : (
                            <td>Отправлено</td>
                          )}
                          <td>
                            <EditItems
                              callback={this.getOrder}
                              item_shop_id={item.item_shop_id}
                              quantity={item.quantity}
                            />
                          </td>
                          <td>
                            <DeleteItem
                              callback={this.getOrder}
                              item_shop_id={item.item_shop_id}
                            />
                          </td>
                        </tr>
                      ))
                      : null}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          ) : null}

          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> История Заказа №{" "}
                {order.id}
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>№</th>
                    <th>Статус</th>
                    <th>Комментарий</th>
                    <th>Менеджер</th>
                    <th>Дата добавления</th>
                  </tr>
                  </thead>
                  <tbody>
                  {order.history
                    ? order.history.map((history, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{history.name}</td>
                        <td>{history.description}</td>
                        <td>{history.user ? history.user.first_name + ' ' + history.user.last_name : null}</td>
                        <td>{history.created_at}</td>
                      </tr>
                    ))
                    : null}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default OrderPage;
