import React, { Component } from "react";
import { httpPost, httpGet } from "../../api";

import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Select from 'react-select'
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
  FormText
} from "reactstrap";

import SearchItems from "../Charts/components/Search";

class AddCoupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
           value: "",
           type: "",
           code: '',
           for_what: '',
           until: '',
           limit: '',
           limit_per_user: '',
           categories: [],
           category_ids: [],
           shops: [],
           shop_ids: [],
           product_ids: [],
           variation: ''
    };
  }



  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  ItemCallbackFunction = childData => {
    this.setState(prevState => ({ product_ids: [...this.state.product_ids, childData] }));
  };


  componentDidMount() {
   
    

      httpGet({ 
        url: "api/admin/dealer/shops",
        params: {
          per_page: 100
        }
      })
        .then(response => {
          const shops = []
          for(let i=0; i < response.data.data.length; i++){
            shops.push({value: response.data.data[i].id, label: response.data.data[i].name })
          }
  
          this.setState({
            shops: shops,
          });
        })
        .catch(error => {
          console.log(error);
        });
   
}

        handleShopChange = shop_ids => {
          this.setState({ shop_ids });
        };

        handleCategoriesChange = category_ids => {
          this.setState({ category_ids });
        };

        handleProductChange = product_ids => {
          this.setState({ product_ids });
        };

         handleInputChange = (inputValue) => {
          httpGet({
            url: "api/admin/product",
              params: {
                search: inputValue,
                active: 1
              }
            })
            .then(response => {
              const products = []
              for(let i=0; i < response.data.data.length; i++){
                products.push({value: response.data.data[i].id, label: response.data.data[i].name })
              }
                this.setState({
                 products: products
                })
             
            })
            .catch(error => {
              console.log(error);
            });
        };


        handleCategoryInputChange = (inputValue) => {
          httpGet({
            url: 'api/admin/category',
            params: {
             search: inputValue
            }
          })
            .then(response => {
              const categories = []
              for(let i=0; i < response.data.data.length; i++){
                categories.push({value: response.data.data[i].id, label: response.data.data[i].name.ru })
              }
                this.setState({
                 categories: categories
                })
            })
            .catch(error => {
              console.log(error);
            });
        };



  SubmitHandler = e => {
    const notyf = new Notyf();
    let formData = new FormData();
    formData.append('code', this.state.code)
    formData.append('type', this.state.type)
    formData.append('value', this.state.value)
    formData.append('for_everything', this.state.for_what)


    if(this.state.limit){
      formData.append('limit', this.state.limit)
    }

    if(this.state.limit_per_user){
      formData.append('limit_per_user', this.state.limit_per_user)
    }

    if(this.state.until){
      formData.append('until', this.state.until)
    }

    
    if(this.state.variation){
      formData.append('status', this.state.variation)
    }

    if(this.state.category_ids){
      for(let i = 0; i < this.state.category_ids.length; i++)
      formData.append('category_ids[]', this.state.category_ids[i].value)
    }
    
    if(this.state.product_ids){
      for(let i = 0; i < this.state.product_ids.length; i++)
      formData.append('product_ids[]', this.state.product_ids[i].value)
    }

    if(this.state.shop_ids){
      for(let i = 0; i < this.state.shop_ids.length; i++)
      formData.append('shop_ids[]', this.state.shop_ids[i].value)
    }

    e.preventDefault();

    httpPost({
      url: "api/admin/coupon/create", 
      data: formData, 
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        notyf.success("Вы добавили купон");
        this.props.history.push("/coupon");  
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    console.log(this.state.type)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="12" md="2">
                    <strong>Добавить Купон</strong>
                  </Col>
                </Row>
              </CardHeader>

              <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                <Row>
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Ключ купона</Label>
                          <Input
                            type="text"
                            name="code"
                            placeholder=""
                            value={this.state.code}
                            onChange={this.changeHandler}
                          />
                       
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Сумма купона</Label>
                          <Input
                            type="text"
                            name="value"
                            placeholder=""
                            value={this.state.value}
                            onChange={this.changeHandler}
                          />
                       
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Тип купона</Label>
                     
                          <Input
                              onChange={this.changeHandler}
                              type="select"
                              name="for_what"
                              value={this.state.for_what}
                              id="select"
                            >
                              <option value="">Выберите тип купона</option>
                              <option value="1">Купон для всех товаров</option>
                              <option value="0">Опциональный купон</option>
                            </Input>
                       
                        </Col>
                      </FormGroup>
                    </Col>

                    

            
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Опция применения купона</Label>
                     
                         <Input
                            onChange={this.changeHandler}
                            type="select"
                            name="type"
                            value={this.state.type}
                            id="select"
                          >
                            <option value="">Выберите опцию</option>
                            <option value="1">Сумма купона для товара</option>
                            <option value="2">Процент купона для товара</option>
                            <option value="3">Сумма купона для корзины</option>
                            <option value="4">Процент купона для корзины</option>
                          </Input>
                       
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
          
                  <Row>
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Дата окончания</Label>
                          <Input
                            type="date"
                            name="until"
                            placeholder=""
                            value={this.state.until}
                            onChange={this.changeHandler}
                          />
                       
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Лимит испозования</Label>
                          <Input
                            type="number"
                            name="limit"
                            placeholder=""
                            value={this.state.limit}
                            onChange={this.changeHandler}
                          />
                           <FormText color="muted">Оставьте пустым, если хотите чтобы было бесконечным</FormText>
                        </Col>
                      </FormGroup>
                    </Col>


                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Лимит для каждого юзера</Label>
                          <Input
                            type="number"
                            name="limit_per_user"
                            placeholder=""
                            value={this.state.limit_per_user}
                            onChange={this.changeHandler}
                          />
                        <FormText color="muted">Оставьте пустым, если хотите чтобы было бесконечным</FormText>
                        </Col>
                      </FormGroup>
                    </Col>

                    
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Тип купона</Label>
                     
                          <Input
                              onChange={this.changeHandler}
                              type="select"
                              name="variation"
                              value={this.state.variation}
                              id="select"
                            >
                              <option value="">Выберите вариацию</option>
                              <option value="1">Купон</option>
                              <option value="2">Подарочный гифт</option>
                            </Input>
                       
                        </Col>
                      </FormGroup>
                    </Col>

                 
                 {(this.state.for_what === "0" && this.state.type === "1" || this.state.for_what === "0" && this.state.type === "2") ? (
                   <>
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Магазины</Label>
                        
                          <Select
                          isMulti
                          placeholder="Поиск магазинов ..."
                          value={this.state.shop_ids}
                          onChange={this.handleShopChange}
                          options={this.state.shops}
                        />
                    
                       </Col>
                      </FormGroup>
                    </Col>
           
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Категории</Label>
                        
                          <Select
                          isMulti
                          placeholder="Поиск категории ..."
                          value={this.state.category_ids}
                          onChange={this.handleCategoriesChange}
                          onInputChange={this.handleCategoryInputChange}
                          options={this.state.categories}
                        />

                        </Col>
                      </FormGroup>
                    </Col>
                  
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Продукты</Label>
                          <Select
                            isMulti
                            placeholder="Поиск продуктов ..."
                            value={this.state.product_ids}
                            onChange={this.handleProductChange}
                            onInputChange={this.handleInputChange}
                            options={this.state.products}
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                  </>
                  ) : null}
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> Сохранить
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


export default AddCoupon
