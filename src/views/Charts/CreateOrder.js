import React, { Component } from 'react';
import { httpGet, httpPost } from "../../api";
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

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
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';




class CreateOrder extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      phone: '',

      deliveries: [],
      delivery_id: null,

      payments: [],
      payment_id: null,

      addresses: [],
      address_id: null,

      comment: '',

      cities: [],
      city_id: null,

      regions:[],
      region_id: null,
  
      name: "",
      full_name: "",
      address: "",
      receiver_phone: "",
         
      typingTimeout: 0
    }

    this.togglePrimary = this.togglePrimary.bind(this);
    
  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary
    });
  }

  componentDidMount(){
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

    httpGet({url: "api/cities"})
    .then(response => {
      this.setState({ cities: response.data.data });
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
  }


    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value })
    }

   

    GetAddress = e => {
     
        httpGet({
          url: "api/admin/address",
          params: {
            phone: e.target.value 
          }
        })
        .then(response => {
          this.setState({ addresses: response.data.data });
        })
        .catch(error => {
          console.log(error);
        });
       
        this.setState({phone: e.target.value })

        

       
    }


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
        this.setState({ regions: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
   
  
   CreateOrder = (e) => {
     e.preventDefault()

    const notyf = new Notyf()
    let formData = new FormData()
    formData.append('phone', this.state.phone)
    if(this.state.delivery_id){
      formData.append('delivery_id', this.state.delivery_id)
    }
    if(this.state.payment_id){
      formData.append('payment_id', this.state.payment_id)
    }
    if(this.state.address_id ){
      formData.append('address_id', this.state.address_id)
    } else {
      formData.append('address[name]', this.state.name)
      formData.append('address[full_name]', this.state.full_name)
      formData.append('address[address]', this.state.address)
      formData.append('address[phone]', this.state.receiver_phone)
      formData.append('address[region_id]', this.state.region_id)
    }
   if(this.state.comment){
     formData.append('comment', this.state.comment)
    }


    e.preventDefault()

    httpPost({
      url: 'api/admin/order/create', 
      data: formData,
      headers: {
          'Content-Type': 'multipart/form-data'
        }}
    )
    .then(response => {
      notyf.success('Вы добавили новый заказ')
    })
    .catch(error =>{
      console.log(error)
    })
    
  }

  render() {
  
    return (
      <div className="animated fadeIn">
        
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                  <Row> 
                    <Col xs="12" md="6">
                        <strong>Создание нового заказа</strong> 
                     </Col>
                  </Row>
              </CardHeader>

             
                <Form className="form-horizontal" onSubmit={this.CreateOrder}>
                <CardBody>
                 <Row>
                   <Col md="6"> 
                   <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Номер телефона</Label>
                      <Input
                      type="text" 
                      name="phone" placeholder="" 
                      value={this.state.phone}  
                      onChange={this.GetAddress}/>
                      <FormText color="muted">998991234567</FormText>
                    </Col>
                   </FormGroup>
                  </Col>

                  <Col md="6"> 
                  
                   <FormGroup row>
                    <Col md="12">
                    <Row>
                      <Col md="4" >  <Label htmlFor="text-input">Адрес доставки</Label></Col>
                      <Col md="4" > </Col>
                      <Col md ="4">
                      <Button
                      color="primary"
                      onClick={this.togglePrimary}
                      className="mr-1"
                      size="sm"
                    >
                      Указать новый адрес
                    </Button>
                    <Modal
                      isOpen={this.state.primary}
                      toggle={this.togglePrimary}
                      className={"modal-primary " + this.props.className}
                    >
                      <ModalHeader toggle={this.togglePrimary}>
                        Новый адрес доставки
                      </ModalHeader>
                      <Form >
                        <ModalBody>

                        <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="select">Название Адреса</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input
                                onChange={this.changeHandler}
                                type="text"
                                name="name"
                                value={this.state.name}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="select">Имя получателя</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input
                                onChange={this.changeHandler}
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
                                onChange={this.changeHandler}
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
                                onChange={this.changeHandler}
                                type="text"
                                name="receiver_phone"
                                value={this.state.receiver_phone}
                              />
                              <FormText color="muted">998991234567</FormText>
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
                                name="city_id"
                                value={this.state.city_id}
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
                                onChange={this.changeHandler}
                                type="select"
                                name="region_id"
                                value={this.state.region_id}
                                id="select"
                              >
                                <option value="">Выберите регион</option>
                                {this.state.regions
                                  ? this.state.regions.map(region => (
                                      <option value={region.id}>
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
                            color="secondary"
                            onClick={this.togglePrimary}
                          >
                            Закрыть
                          </Button>
                        </ModalFooter>
                      </Form>
                    </Modal>
                      </Col>
                    </Row>
                     
                      <Input
                                onChange={this.changeHandler}
                                type="select"
                                name="address_id"
                                value={this.state.address_id}
                                id="select"
                              >
                                <option value="">Выберите адрес доставки</option>
                                {this.state.addresses
                                  ? this.state.addresses.map(address => (
                                      <option value={address.id}>
                                        {address.name}
                                      </option>
                                    ))
                                  : null}
                              </Input>
                      <FormText color="muted">Город Ташкент, ул Махтумкулы, дом 2</FormText>
                    </Col>
                   </FormGroup>
                  </Col>


                  <Col md="6"> 
                   <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Способ Оплаты</Label>
                      <Input
                                onChange={this.changeHandler}
                                type="select"
                                name="payment_id"
                                value={this.state.payment_id}
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
                      <FormText color="muted">Payme, Click ...</FormText>
                    </Col>
                   </FormGroup>
                  </Col>


                  <Col md="6"> 
                   <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Cпособ доставки</Label>
                      <Input
                                onChange={this.changeHandler}
                                type="select"
                                name="delivery_id"
                                value={this.state.delivery_id}
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
                      <FormText color="muted">Выберите из списка</FormText>
                    </Col>
                   </FormGroup>
                  </Col>

              
                 </Row>

                
                 <Row>
               <Col md="12">
                <FormGroup row>
                  <Col md="3">
                  <Label htmlFor="text-input">Комментарий к заказу</Label>
                    </Col>
                    <Col md="9">
                   
                      <Input type="text" id="text-input" name="comment" placeholder="" value={this.state.comment}  onChange={this.changeHandler}/>
                      <FormText color="muted">Комментарии</FormText>
                    </Col>
                  </FormGroup>
               </Col>
                 
               </Row>
          </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Сохранить</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Сбросить</Button>
              </CardFooter>
              </Form>
            
            </Card>
           
          </Col>
        
        
        </Row>
     
 
      </div>
    );
  }
}

export default CreateOrder;
