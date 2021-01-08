import React, { Component } from "react";
import { httpGet, httpPost } from "../../api";
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
  FormText,
  Input,
  Label,
  Row
} from "reactstrap";

class UpdateShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shop_name: "",
      status: null,
      activate: null,
      dealers: [],
      dealer_id: null,
      integrations: [],
      selectedOption: []
    };
  }

  componentWillMount(){
   
    if(this.props.location.shop_id!== undefined) {
      localStorage.setItem('shop_id', this.props.location.shop_id);
    }
  }

  componentDidMount() {
    
    httpGet({ 
      url: "api/admin/dealer/shops", 
        params: {
          shop_id: localStorage.getItem('shop_id')
        }
      })
      .then(response => {
        const integrations = []
        for(let i=0; i < response.data.data.integrations.length; i++){
          integrations.push({value: response.data.data.integrations[i].id, label: response.data.data.integrations[i].id })
        }

        console.log(integrations)
        this.setState({
          shop_name: response.data.data.name,
          status: response.data.data.status,
          dealer_id: response.data.data.user.id,
          selectedOption: integrations
        });
      })
      .catch(error => {
        console.log(error);
      });

    httpGet({
      url: "api/admin/dealer", 
        params: {
          per_page: 200
        } 
      })
      .then(response => {
        this.setState({
          dealers: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
     }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  SubmitHandler = e => {
    const notyf = new Notyf();
    e.preventDefault();

    httpPost({
      url: `api/admin/dealer/shop/update/${this.props.location.shop_id}`,
      data: {
        name: this.state.shop_name,
        status: this.state.status,
        activate_all_items: this.state.activate,
        dealer_id: this.state.dealer_id,
        integration_ids: this.state.selectedOption.map(selected => selected.value)
      }
    })
      .then(response => {
   
        notyf.success("Вы обновили информацию");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {

    const options = [
      { value: '1C_DELIVERED', label: '1C_DELIVERED' },
      { value: '1C', label: '1C' },
      { value: 'ASD', label: 'ASD' }
    ]

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="12" md="6">
                    <strong>Обновить информацию магазина</strong>
                  </Col>
                </Row>
              </CardHeader>

              <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Наименование</Label>
                        </Col>
                        <Col md="9">
                          <Input
                            type="text"
                            id="text-input"
                            name="shop_name"
                            placeholder=""
                            value={this.state.shop_name}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">Добавьте магазин</FormText>
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Статус магазина</Label>
                        </Col>
                        <Col xs="12" md="6">
                          <Input
                            type="select"
                            onChange={this.handleChange}
                            value={this.state.status}
                            name="status"
                            id="select"
                            placeholder=""
                          >
                            <option value="">Выберите статус</option>
                             <option value="0"> Не активный</option>
                            <option value="1">Активный</option>
                          </Input>

                          <FormText color="muted">Статус магазина</FormText>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Интеграция</Label>
                        </Col>
                        <Col xs="12" md="6">
                         

                        <Select
                          isMulti
                          value={this.state.selectedOption}
                          onChange={this.handleChange}
                          options={options}
                        />

                          <FormText color="muted">Автоматическая интеграция товаров</FormText>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">
                            Активировать все товары?
                          </Label>
                        </Col>
                        <Col xs="12" md="6">
                          <Input
                            type="select"
                            onChange={this.handleChange}
                            value={this.state.activate}
                            name="activate"
                            id="select"
                            placeholder=""
                          >
                            <option value="">Выберите</option>
                            <option value="0">Нет</option>
                            <option value="1">Да</option>
                          </Input>

                          <FormText color="muted">
                            Все товары в данном магазине будут изменены
                          </FormText>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Дилер</Label>
                        </Col>
                        <Col xs="12" md="6">
                          {this.state.dealers ? (
                            <Input
                              type="select"
                              onChange={this.handleChange}
                              value={this.state.dealer_id}
                              name="dealer_id"
                              id="select"
                              placeholder=""
                            >
                              <option value="">Выберите Дилера</option>
                              {this.state.dealers.map(dealer => (
                                <option key={dealer.id} value={dealer.id}>
                                  {dealer.first_name} {dealer.last_name}
                                </option>
                              ))}
                            </Input>
                          ) : null}
                          <FormText color="muted">
                           Вы можете привязать данный магазин к другому Дилеру 
                          </FormText>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
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

export default UpdateShop;
