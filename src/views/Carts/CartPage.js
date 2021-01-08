import React, { Component } from "react";
import { httpGet, httpPost, httpDelete } from "../../api";
import { Notyf } from "notyf";
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
  Table
} from "reactstrap";

import DeleteProduct from "./deleteProduct";
import CartItems from "./cartProducts";

class CartPage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      discount: null,
      states: [],
      selecteditem: null,
      quantity: null,
      cart: [],
      items: [],
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  componentDidMount() {
  
    this.getCart();
  }

  ItemCallbackFunction = childData => {
    this.setState({ selecteditem: childData });
  };

  getCart = () => {
      httpGet({
        url: "api/admin/cart", 
        params: {
          cart_id: this.props.location.cart_id
        }
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          cart: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  SubmitDiscount = e => {
    const notyf = new Notyf();
    let formData = new FormData();
    formData.append("cart_id", this.props.location.cart_id);
    formData.append("discount", this.state.discount);

   
    e.preventDefault();

      httpPost({
        url:`api/admin/cart/update`, 
        data: formData, 
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(response);
        notyf.success("Вы добавили скидку корзине");
        this.setState(
          {
            cart: response.data.data,
            quantity: "",
            item_shop_id: null
          },
          () => {
            this.getCart();
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  SubmitProduct = e => {
    const notyf = new Notyf();
    let formData = new FormData();
    formData.append("cart_id", this.props.location.cart_id);
    formData.append("item_shop_id", this.state.selecteditem);
    formData.append("quantity", this.state.quantity);

   
    e.preventDefault();

      httpPost({
        url: `api/admin/cart/add`, 
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(response);
        notyf.success("Вы добавили скидку корзине");
        this.setState(
          {
            cart: response.data.data,
            discount: ""
          },
          () => {
            this.getCart();
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  Delete = (e) => {
    const notyf = new Notyf()
    e.preventDefault()
    httpDelete({
      url:`api/admin/user/delete/${this.props.id}` 
    })
    .then(response => {
      notyf.error('Вы удалили Продукт')
      this.props.function()
    })
    .catch(error =>{
      console.log(error)
    })
}

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  render() {
    const { cart } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12" xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
                <strong>Информация о Пользователе</strong>
              </CardHeader>
              <CardBody>
                <ListGroupItem>
                  <b>Дата оформления:</b> {cart.updated_at}
                </ListGroupItem>
                { cart.device ? (
                  <ListGroup>
                    <ListGroupItem>
                      <b>ID:</b> {cart.device.user.id}
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>ФИО:</b> {cart.device.user.first_name}{" "}
                      {cart.device.user.last_name}
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>Номер телефона:</b> {cart.device.user.phone.replace(/^(\d{3})(\d{2})\s*(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5')}
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>Email:</b> {cart.device.user.email}
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
                <i className="fa fa-align-justify"></i> Корзина № {cart.id}
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <th>Артикул</th>
                      <th>Изображение</th>
                      <th>Наименование</th>
                      <th>Дилер</th>
                      <th>Количество</th>
                      <th>Цена</th>
                      <th>Действие</th>
                    </tr>
                  </thead>

                  <tbody>
                    {typeof cart.items == "object"
                      ? cart.items.map(item => (
                          <tr key={item.id}>
                            <td>{item.item_shop_id}</td>
                            <td>
                              <img
                                src={item.product.images[0].types.small_default}
                                alt=""
                              />
                            </td>
                            <td>{item.product.name}</td>
                            <td>{item.shop.name}</td>
                            <td>{item.quantity}</td>
                            <td>
                              {item.total_with_discount
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                              сум
                            </td>
                            <td>
                          <DeleteProduct cart_id={cart.id} function={this.getCart} item_shop_id={item.item_shop_id}/>
                            </td>
                          </tr>
                        ))
                      : null}
                   
                  </tbody>
                </Table>
              </CardBody>
              <CardHeader>
                 Сумма заказа: {cart.total} <br/>
                 Сумма заказа со скидкой: {cart.total_with_discount}
              </CardHeader>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12">
            <Card>
              <Form onSubmit={this.SubmitDiscount} className="form-horizontal">
                <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Добавить скидку</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange={this.changeHandler}
                        type="text"
                        name="discount"
                        value={this.state.discount}
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

          <Col xs="12" md="12">
            <Card>
              <Form onSubmit={this.SubmitProduct} className="form-horizontal">
                <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Добавить продукт</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <CartItems  itemFunction={this.ItemCallbackFunction}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Количество</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange={this.changeHandler}
                        type="text"
                        name="quantity"
                        value={this.state.quantity}
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
      </div>
    );
  }
}

export default CartPage;
