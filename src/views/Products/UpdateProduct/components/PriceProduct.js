import React, { Component } from "react";
import {Link} from 'react-router-dom'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
  Table
} from "reactstrap";
import { httpGet, httpPost } from "../../../../api";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import UpdateDeleteItems from "./UpdateDeleteItems";

class PriceProduct extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      shop_id: '',
      initial_price: '',
      active: 1,
      percent: '',
      shop_quantity:  '',
      until: "",
      cashback_percent: '',
      product_code: '',
      options: [],
      items: [],
      shops: [],
      shop_reference: "",
      index: 0,
      price_percent: '',
      final_price: '',
      warranty: ''
    };
  }

  componentDidMount() {
    setTimeout(() => {
      // this.setState({
      //   items: this.props.items
      // })
      if (this.props.items && this.props.items.length) {
        this.setState({
          active:this.props.items[this.state.index].active,
          shop_id: this.props.items[this.state.index].shop_id,
          initial_price: this.props.items[this.state.index].initial_price,
          final_price: this.props.items[this.state.index].price,
          price_percent: this.props.items[this.state.index].percent,
          warranty: this.props.items[this.state.index].warranty,
          cashback_percent:  this.props.items[this.state.index].cashback_percent,
          product_code:  this.props.items[this.state.index].product_code,
          percent: this.props.items[this.state.index].discount
            ? this.props.items[this.state.index].discount.percent
            : null,
          shop_quantity: this.props.items[this.state.index].shop_quantity,
          until: this.props.items[this.state.index].discount
            ? this.props.items[this.state.index].discount.until
            : null,
          shop_reference: this.props.items[this.state.index].shop_reference
            ? this.props.items[this.state.index].shop_reference
            : null
        });
      }
    }, 3000);

    httpGet({
      url: "api/admin/dealer/shops",
        params: {
         total:1
        }
      })
      .then(response => {
        this.setState({
          shops: response.data.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePrice = e => {
    this.setState({ [e.target.name]: e.target.value }, ()=>{
      let final_price = parseInt(this.state.initial_price) + parseInt(this.state.initial_price * this.state.price_percent/100)
      this.setState({
        final_price: final_price
      })
    });
    
  };

  IndexCall = child => {
    this.setState(
      {
        index: child
      },
      () => {
        this.setState({
          active:this.props.items[this.state.index].active,
          shop_id: this.props.items[this.state.index].shop_id,
          initial_price: this.props.items[this.state.index].initial_price ? this.props.items[this.state.index].initial_price  : null ,
          final_price: this.props.items[this.state.index].price ? this.props.items[this.state.index].price : null,
          price_percent: this.props.items[this.state.index].percent ? this.props.items[this.state.index].percent : null,
          warranty: this.props.items[this.state.index].warranty,
          product_code:  this.props.items[this.state.index].product_code,
          cashback_percent: this.props.items[this.state.index].cashback_percent,
          percent: this.props.items[this.state.index].discount
            ? this.props.items[this.state.index].discount.percent
            : null,
          shop_quantity: this.props.items[this.state.index].shop_quantity,
          until: this.props.items[this.state.index].discount
            ? this.props.items[this.state.index].discount.until
            : null,
          shop_reference: this.props.items[this.state.index].shop_reference
            ? this.props.items[this.state.index].shop_reference
            : null
        });
      }
    );
  };

  AddItem = e => {
    e.preventDefault();
    const notyf = new Notyf();
    httpPost({
      url: `api/admin/product/item/create/${this.props.id}`,
      data: {
        discount: {
          percent: this.state.percent,
          until: this.state.until
        },
        shop_id: this.state.shop_id,
        price: this.state.final_price,
        percent: this.state.price_percent,
        cashback_percent: this.state.cashback_percent,
        active: this.state.active,
        product_code: this.state.product_code,
        shop_reference: this.state.shop_reference,
        quantity: this.state.shop_quantity,
        warranty: this.state.warranty,
      }
    })
      .then(response => {
        notyf.success("Вы добавили вариацию продукту");
        this.props.getProducts();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <Form onSubmit={this.AddItem} className="form-horizontal">
                <CardHeader>
                  {/* <Row>

                  <Col xs="12" md="2"> <strong>Вариация товара</strong>  </Col>
                  <Col xs="12" md="9"><strong>{this.props.brand ? this.props.brand.name : null} {this.props.class ? this.props.class.name : null} {this.props.model}</strong> </Col>
                  <Col xs="12" md="1">
                      
                      <Input type="select" name="select" id="select">
                          
                          <option value="1">ru</option>
                          <option value="2">eng</option>
                          <option value="3">uz</option>
                          
                        </Input>
                  </Col>
              </Row> */}

                  <Row>
                    <Col md="4">
                      {" "}
                      <strong>Вариация товара</strong>
                    </Col>
                    <Col md="4"></Col>
                    <Col md="4">
                      <strong>
                        {this.props.brand ? this.props.brand.name : null}{" "}
                        {this.props.class ? this.props.class.name : null}{" "}
                        {this.props.model}
                      </strong>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Дилер</Label>
                    </Col>
                    <Col xs="12" md="6">
                      <Input
                        type="select"
                        name="shop_id"
                        value={this.state.shop_id}
                        onChange={this.handleChange}
                        placeholder=""
                      >
                        <option value="">Выберите Магазин</option>
                        {this.state.shops
                          ? this.state.shops.map(shop => (
                              <option key={shop.id} value={shop.id}>{shop.name}</option>
                            ))
                          : null}
                      </Input>
                      <FormText color="muted">
                        Привязка вариации к магазину дилера
                      </FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Цена </Label>
                    </Col>
                    <Col xs="12" md="2">
                      <Input
                        type="text"
                        id="text-input"
                        name="initial_price"
                        value={this.state.initial_price}
                        onChange={this.handlePrice}
                        placeholder=""
                      />
                      <FormText color="muted">Начальная цена</FormText>
                    </Col>
                      X
                    <Col xs="12" md="1">
                      <Input
                        type="text"
                        id="text-input"
                        name="price_percent"
                        value={this.state.price_percent}
                        onChange={this.handlePrice}
                        placeholder=""
                      />
                      <FormText color="muted">Процент</FormText>
                    </Col>
                      =
                    <Col xs="12" md="3">
                      <Input
                        type="text"
                        id="text-input"
                        name="final_price"
                        value={this.state.final_price}
                        onChange={this.handleChange}
                        placeholder=""
                      />
                      <FormText color="muted">Итоговая цена</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Артикул контр агента </Label>
                    </Col>
                    <Col xs="12" md="3">
                      <Input
                        type="text"
                        id="text-input"
                        name="shop_reference"
                        value={this.state.shop_reference}
                        onChange={this.handleChange}
                        placeholder=""
                      />
                      <FormText color="muted">Артикул дилкра</FormText>
                    </Col>
                  </FormGroup>


                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Количество у поставщика </Label>
                    </Col>
                    <Col xs="12" md="3">
                      <Input
                        type="text"
                        id="text-input"
                        name="shop_quantity"
                        value={this.state.shop_quantity}
                        onChange={this.handleChange}
                        placeholder=""
                      />
                      <FormText color="muted">Количество у поставщика</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Код продукта </Label>
                    </Col>
                    <Col xs="12" md="3">
                      <Input
                        type="text"
                        id="text-input"
                        name="product_code"
                        value={this.state.product_code}
                        onChange={this.handleChange}
                        placeholder=""
                      />
                      <FormText color="muted"></FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Гарантия (месяц) </Label>
                    </Col>
                    <Col xs="12" md="3">
                      <Input
                        type="text"
                        id="text-input"
                        name="warranty"
                        value={this.state.warranty}
                        onChange={this.handleChange}
                        placeholder=""
                      />
                      <FormText color="muted">Гарантия на товар</FormText>
                    </Col>
                  </FormGroup>
                  
                  <FormGroup row>
                  <Col md="3">
                      <Label htmlFor="text-input">Активировать Item</Label>
                    </Col>
                    <Col xs="12" md="6">
                      <Input
                        type="select"
                        name="active"
                        value={this.state.active}
                        onChange={this.handleChange}
                        placeholder=""
                      >
                        <option value="">Выберите Действие</option>
                        <option value="1">Включить</option>
                        <option value="0">Отключить</option>
                       
                      </Input>
                      <FormText color="muted">
                        Активировать item товара
                      </FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Cashback </Label>
                    </Col>
                    <Col xs="12" md="3">
                      <Input
                        type="text"
                        id="text-input"
                        name="cashback_percent"
                        value={this.state.cashback_percent}
                        onChange={this.handleChange}
                        placeholder=""
                      />
                      <FormText color="muted">Укажите процент</FormText>
                    </Col>
                
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Скидки </Label>
                    </Col>
                    <Col xs="12" md="3">
                      <Input
                        type="text"
                        id="text-input"
                        name="percent"
                        value={this.state.percent}
                        onChange={this.handleChange}
                        placeholder=""
                      />
                      <FormText color="muted">Укажите процент</FormText>
                    </Col>
                    <Col xs="12" md="3">
                      <Input
                        type="date"
                        id="text-input"
                        name="until"
                        value={this.state.until}
                        onChange={this.handleChange}
                        placeholder=""
                      />
                      <FormText color="muted">
                        Укажите дату действия скидки
                      </FormText>
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> Сохранить
                  </Button>
                  <Button type="reset" size="sm" color="danger">
                    <i className="fa fa-ban"></i> Сбросить
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>

          <Col xs="12" md="12">
            <Card>
              <Form onSubmit={this.AddItem} className="form-horizontal">
                <CardHeader>
                  <Row>
                    <Col xs="12" md="2">
                      {" "}
                      <strong>Таблица вариаций</strong>{" "}
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Table responsive striped>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Артикул</th>
                        <th>Артикул дилера</th>
                        <th>Дилер</th>
                        <th>Цена</th>
                        <th>Код продукта</th>
                        <th>К-во у поставщика</th>
                        <th>К-во у Brandstore</th>
                        <th>Cashback</th>
                        <th>Скидка</th>
                        <th>Статус</th>
                        <th>Действие</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.items
                        ? this.props.items.map((item, index) => (
                            <tr key={index}>
                              <td>{item.item_shop_id}</td>
                              <td>{item.reference}</td>
                              <td>{item.shop_reference}</td>
                              {/* <td><img style={{width: '50%'}} alt={product.model} src={(product.images && product.images.length) ? product.images[0].types.small_default : null} /></td> */}
                              <td>{item.name} </td>
                              <td>
                                {" "}
                                {item.price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                                сум
                              </td>
                              <td>{item.product_code}</td>
                              <td>{item.shop_quantity}</td>
                              <td>{item.brandstore_quantity}</td>
                              <td>{item.cashback_percent + "%"}</td>
                              <td>
                                {" "}
                                {item.discount
                                  ? item.discount.percent + "%"
                                  : "Скидок нет"}
                              </td>
                              <td>
                            {item.active ?   <Badge color="success">Активный</Badge> :  <Badge color="danger">Не активный</Badge> }
                          
                          </td>
                            
                              <td>
                                {/* <UpdateDeleteItems function={this.getProduct} id={product.id} /> */}
                                <UpdateDeleteItems
                                  item_shop_id={item.item_shop_id}
                                  index={index}
                                  IndexCall={this.IndexCall}
                                  getProducts = {this.props.getProducts}
                                />
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </Table>
                </CardBody>
              </Form>
              <CardFooter>
                <Link to="/buttons/products"> 
                    <Button  size="sm" color="danger">
                      <i className="fa fa-dot-circle-o"></i> Назад
                    </Button>
                </Link>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PriceProduct;
