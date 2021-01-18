import React, {Component} from "react";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";
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
import {Form, FormGroup, Label, Input} from "reactstrap";
import SplitButton from "../Charts/components/SplitButton";
import {httpGet} from "../../api";

class Orders extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      search: localStorage.getItem("search")
        ? localStorage.getItem("search")
        : "",
      min_price: localStorage.getItem("min_price")
        ? localStorage.getItem("min_price")
        : "",
      max_price: localStorage.getItem("max_price")
        ? localStorage.getItem("max_price")
        : "",
      deliveries: [],
      deliveryID: localStorage.getItem("deliveryID")
        ? localStorage.getItem("deliveryID")
        : "",
      payments: [],
      paymentID: localStorage.getItem("paymentID")
        ? localStorage.getItem("paymentID")
        : "",
      states: [],
      stateID: localStorage.getItem("stateID")
        ? localStorage.getItem("stateID")
        : "",
      start_date: localStorage.getItem("start_date")
        ? localStorage.getItem("start_date")
        : "",
      end_date: localStorage.getItem("end_date")
        ? localStorage.getItem("end_date")
        : "",
      first: 0,
      last: 10,
      meta: {
        current_page: null,
        last_page: null,
        per_page: 100,
        total: null
      }
    };
  }

  componentDidMount() {
    httpGet({url: "api/order/deliveries"})
      .then(response => {
        this.setState({deliveries: response.data.data});
      })
      .catch(error => {
        console.log(error);
      });

    httpGet({url: "api/order/payments"})
      .then(response => {
        this.setState({payments: response.data.data});
      })
      .catch(error => {
        console.log(error);
      });

    httpGet({url: "api/order/states"})
      .then(response => {
        this.setState({states: response.data.data});
      })
      .catch(error => {
        console.log(error);
      });

    setTimeout(() => {
      this.getOrders();
    }, 10);
  }

  getOrderExcel = () => {
    const cookie = new Cookies();
    let token = cookie.get("access_token");

    let url = new URL("https://api2.allprinter.uz/api/admin/order");
    url.search = new URLSearchParams({
      search: this.state.search,
      min_price: this.state.min_price,
      max_price: this.state.max_price,
      delivery_id: this.state.deliveryID,
      payment_id: this.state.paymentID,
      order_state_id: this.state.stateID,
      page: this.state.meta.current_page,
      per_page: this.state.meta.per_page,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      excel: 2
    });

    fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    }).then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "order_excel.xls";
        a.click();
      });
      //window.location.href = response.url;
    });
  };

  getProductExcel = () => {
    const cookie = new Cookies();
    let token = cookie.get("access_token");

    let url = new URL("https://api2.allprinter.uz/api/admin/order");
    url.search = new URLSearchParams({
      search: this.state.search,
      min_price: this.state.min_price,
      max_price: this.state.max_price,
      delivery_id: this.state.deliveryID,
      payment_id: this.state.paymentID,
      order_state_id: this.state.stateID,
      page: this.state.meta.current_page,
      per_page: this.state.meta.per_page,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      excel: 1
    });

    fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    }).then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "product_excel.xls";
        a.click();
      });
      //window.location.href = response.url;
    });
  };

  getOrders = () => {
    httpGet({
      url: "api/admin/order",
      params: {
        search: this.state.search,
        min_price: this.state.min_price,
        max_price: this.state.max_price,
        delivery_id: this.state.deliveryID,
        payment_id: this.state.paymentID,
        order_state_id: this.state.stateID,
        page: this.state.meta.current_page,
        per_page: this.state.meta.per_page,
        start_date: this.state.start_date,
        end_date: this.state.end_date
      }
    })
      .then(response => {
        this.setState({
          orders: response.data.data,
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
    meta.current_page = e;

    this.setState({meta: meta});

    this.getOrders();
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

    this.getOrders();
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
      this.setState({meta: meta});
    }

    this.getOrders();
  };

  handleChange = e => {
    localStorage.setItem(`${[e.target.name]}`, e.target.value);
    e.preventDefault();
    this.setState(
      {
        [e.target.name]: e.target.value,
        meta: {
          current_page: 1
        }
      },
      () => {
        setTimeout(() => {
          this.getOrders();
        }, 100);
      }
    );
  };

  Reset = () => {
    localStorage.setItem("search", "");
    localStorage.setItem("min_price", "");
    localStorage.setItem("max_price", "");
    localStorage.setItem("deliveryID", "");
    localStorage.setItem("paymentID", "");
    localStorage.setItem("stateID", "");
    localStorage.setItem("start_date", "");
    localStorage.setItem("end_date", "");

    this.setState(
      {
        search: "",
        min_price: "",
        max_price: "",
        deliveryID: "",
        paymentID: "",
        stateID: "",
        start_date: "",
        end_date: ""
      },
      () => {
        this.getOrders();
      }
    );
  };

  render() {

    const {orders} = this.state;

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
                        <Label htmlFor="text-input">Доставка</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input
                          type="select"
                          name="deliveryID"
                          value={this.state.deliveryID}
                          onChange={this.handleChange}
                          id="select"
                        >
                          <option value=""> Выберите метод доставки</option>
                          {this.state.deliveries
                            ? this.state.deliveries.map((delivery) => (
                              <option value={delivery.id}>
                                {delivery.name}
                              </option>
                            ))
                            : null}
                        </Input>
                      </Col>
                    </FormGroup>

                    <FormGroup column>
                      <Col md="3">
                        <Label htmlFor="text-input">Оплата</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input
                          type="select"
                          name="paymentID"
                          value={this.state.paymentID}
                          onChange={this.handleChange}
                          id="select"
                        >
                          <option value="">Выберите метод оплаты</option>
                          {this.state.payments
                            ? this.state.payments.map((payment) => (
                              <option value={payment.id}>
                                {payment.name}
                              </option>
                            ))
                            : null}
                        </Input>
                      </Col>
                    </FormGroup>

                    <FormGroup column>
                      <Col md="12">
                        <Label htmlFor="select">Статус заказа</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input
                          type="select"
                          name="stateID"
                          value={this.state.stateID}
                          onChange={this.handleChange}
                          id="select"
                        >
                          <option value=""> Выберите статус заказа</option>
                          {this.state.states
                            ? this.state.states.map((state) => (
                              <option value={state.id}>{state.name}</option>
                            ))
                            : null}
                        </Input>
                      </Col>
                    </FormGroup>

                    <FormGroup column>
                      <Col md="12">
                        <Label htmlFor="text-input">С</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input
                          type="date"
                          id="text-input"
                          name="start_date"
                          value={this.state.start_date}
                          onChange={this.handleChange}
                          placeholder=""
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup column>
                      <Col md="12">
                        <Label htmlFor="text-input">По</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input
                          type="date"
                          id="text-input"
                          name="end_date"
                          value={this.state.end_date}
                          onChange={this.handleChange}
                          placeholder=""
                        />
                      </Col>
                    </FormGroup>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col className="col-md-2">
                    <Button
                      onClick={this.Reset}
                      type="reset"
                      size="sm"
                      color="danger"
                    >
                      <i className="fa fa-ban"></i> Сбросить
                    </Button>
                  </Col>
                  <Col className="col-md-5"></Col>
                  <Col className="col-md-5">
                    <Row>
                      <Col className="col-md-5">
                        <Button
                          onClick={this.getOrderExcel}
                          type="reset"
                          size="sm"
                          color="success"
                        >
                          <i className="fa fa-file-excel-o"></i> Выгрузка
                          заказов
                        </Button>
                      </Col>

                      <Col className="col-md-6">
                        <Button
                          onClick={this.getProductExcel}
                          type="reset"
                          size="sm"
                          color="primary"
                        >
                          <i className="fa fa-file-text-o"></i> Выгрузка заказов
                          по товарам
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>

          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <div className="row d-flex align-items-center justify-content-between">
                  <div className="col-auto">
                    <i className="fa fa-align-justify"></i> Таблица заказов:{" "}
                    {this.state.meta.total}
                  </div>
                  <div className="col-auto">
                    <Link to="/orders/add">
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
                    <th>Клиент</th>

                    <th>Телефон</th>
                    <th>Дата</th>
                    <th>Дата доставки</th>
                    <th>Сумма</th>
                    {/*<th>Оплата</th>*/}
                    <th>Дилеры</th>
                    {/*<th>Открыл</th>*/}
                    <th>Область</th>
                    <th>Ответ склада (Обработан)</th>
                    <th>Статус</th>
                    <th>Действие</th>
                  </tr>
                  </thead>
                  <tbody>
                  {orders
                    ? orders.map((order) => (
                      <tr>
                        <td>{order.id}</td>
                        {order.user_name === null ? (
                          <td></td>
                        ) : (
                          <td>{order.user_name} </td>
                        )}




                        {console.log(order)}
                        <td>
                          {order.user_phone.replace(
                            /^(\d{3})(\d{2})\s*(\d{3})(\d{2})(\d{2})/,
                            "$1 $2 $3 $4 $5"
                          )}{" "}
                        </td>
                        <td>{order.created_at}</td>
                        <td>
                          {order.delivered_at
                            ? order.delivered_at
                            : "Не доставлен"}
                        </td>
                        <td>
                          {order.total
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                          сум
                        </td>
                        {/*<td>{order.payment.name}</td>*/}
                        <td>{order.shop_name}</td>


                        {/*<td>*/}
                        {/*  {order.history && order.history[0].user ? order.history[0].user.type === "App\\Models\\Admin"*/}
                        {/*    ? order.history[0].user.first_name + " " +*/}
                        {/*    order.history[0].user.last_name*/}
                        {/*    : "Пользователь" : null}*/}
                        {/*</td>*/}

                        <td>
                          {order.address ?
                            order.address.region && order.address.region.city.id === 1 ? null
                              : order.address.region && order.address.region.city ?
                              order.address.region.city.name
                              : null
                            : null}
                        </td>
                        <td>
                          {order.one_in_process === null ? (
                            "Не отправлен"
                          ) : order.one_in_process === 1 ? (
                            <img
                              style={{width: "25px"}}
                              src="../../assets/img/avatars/success.png"
                              alt="success"
                            />
                          ) : order.one_in_process === 0 ? (
                            <img
                              style={{width: "25px"}}
                              src="../../assets/img/avatars/error.png"
                              alt="error"
                            />
                          ) : (
                            ""
                          )}
                        </td>

                        {order.state.name === "Открыт" ? (
                          <td>
                            <Badge color="warning">
                              {order.state.name}
                            </Badge>
                          </td>
                        ) : order.state.name === "Отменен" ? (
                          <td>
                            <Badge color="danger">{order.state.name}</Badge>
                          </td>
                        ) : order.state.name === "Доставлен" ? (
                          <td>
                            <Badge color="success">
                              {order.state.name}
                            </Badge>
                          </td>
                        ) : order.state.name === "В пути" ? (
                          <td>
                            <Badge color="secondary">
                              {order.state.name}
                            </Badge>
                          </td>
                        ) : (
                          <td>
                            <Badge color="primary">
                              {order.state.name}
                            </Badge>
                          </td>
                        )}

                        <td>
                          <SplitButton id={order.id}/>
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

export default Orders;
