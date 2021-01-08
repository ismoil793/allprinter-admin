import React, { Component } from "react";

import {
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
  Row
} from "reactstrap";
import { httpGet, httpPost } from "../../../../api";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

class PriceProduct extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      shop_id: null,
      initial_price: null,
      product_code: '',
      
      active: null,
      percent: null,
      until: null,
      options: [],
      shops: [],
      cashback_percent: '',
      shop_reference:'',
      price_percent: null,
      final_price: null,
      quantity: null,
      warranty: null,
      meta: {
        current_page: null,
        last_page: null,
        per_page: 10
      }
    };
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

  async componentDidMount() {
    await httpGet({
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

  AddItem = e => {
    e.preventDefault();
    const notyf = new Notyf();
    httpPost({
      url: `api/admin/product/item/create/${this.props.id}`,
      data: {
        // if(this.state.percent)
        discount: {
          percent: this.state.percent,
          until: this.state.until
        },
        warranty: this.state.warranty,
        shop_id: this.state.shop_id,
        price: this.state.final_price,
        percent: this.state.price_percent,
        cashback_percent: this.state.cashback_percent,
        product_code: this.state.product_code,
        active: this.state.active,
        options: this.state.options,
        delete_discount: 1,
        shop_reference: this.state.shop_reference,
        quantity: this.state.quantity
      }
    })
      .then(response => {
    
        notyf.success("Вы добавили Вариацию продукту");
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
                  <Row>
                    <Col xs="12" md="2">
                      {" "}
                      <strong>Вариация товара</strong>{" "}
                    </Col>
                    <Col xs="12" md="9">
                      {" "}
                    </Col>

                    <Col xs="12" md="1">
                      <Input type="select" name="select" id="select">
                        <option value="1">ru</option>
                        <option value="2">eng</option>
                        <option value="3">uz</option>
                      </Input>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Дилер</Label>
                    </Col>
                    <Col xs="12" md="6">
                      {this.state.shops ? (
                        <Input
                          type="select"
                          onChange={this.handleChange}
                          value={this.state.shop_id}
                          name="shop_id"
                          id="select"
                          placeholder=""
                        >
                          <option value="0">Выберите магазин</option>
                          {this.state.shops.map(shop => (
                            <option key={shop.id} value={shop.id}>
                              {shop.name}
                            </option>
                          ))}
                        </Input>
                      ) : null}
                      <FormText color="muted">
                        Вариация будет привязана к выбранному магазину
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
                      <Label htmlFor="text-input">Артикул контрагента</Label>
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
                      <FormText color="muted">Артикул дилера</FormText>
                    </Col>
                  </FormGroup>
{/* 
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Количество </Label>
                    </Col>
                    <Col xs="12" md="3">
                      <Input
                        type="text"
                        id="text-input"
                        name="quantity"
                        value={this.state.quantity}
                        onChange={this.handleChange}
                        placeholder=""
                      />
                      <FormText color="muted"></FormText>
                    </Col>
                  </FormGroup> */}


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
                      <FormText color="muted"></FormText>
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
                      <Label htmlFor="text-input">Количество </Label>
                    </Col>
                    <Col xs="12" md="3">
                      <Input
                        type="text"
                        id="text-input"
                        name="quantity"
                        value={this.state.quantity}
                        onChange={this.handleChange}
                        placeholder=""
                      />
                      <FormText color="muted"></FormText>
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
        </Row>
      </div>
    );
  }
}

export default PriceProduct;
