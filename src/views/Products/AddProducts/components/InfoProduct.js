import React, { Component } from "react";
import { httpGet, httpPost } from "../../../../api";
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row
} from "reactstrap";
import ClassIntegrationReactSelect from "./ClassSuggest";
import BrandIntegrationReactSelect from "./BrandSuggest";

class InfoProduct extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      classes: [],
      brands: [],
      selectedbrand: {},
      selectedclass: {},
      model: "",
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  async componentDidMount() {
    await httpGet({
      url: "api/admin/class", 
      params: {
        total: 1
      }
      })
      .then(response => {
        this.setState({
          classes: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    await httpGet({
      url: "api/admin/brand", 
      params: {
        total: 1
      }
      })
      .then(response => {
        this.setState({
          brands: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  BrandCallbackFunction = (childData) => {
    this.setState({selectedbrand: childData})
}

  ClassCallbackFunction = (childData) => {
    this.setState({selectedclass: childData})
  }


  CreateProduct = e => {
    e.preventDefault();
    const notyf = new Notyf()
    httpPost({
      url: "api/admin/product/create",
      data: {
        brand_id: this.state.selectedbrand.value,
        model: this.state.model,
        class_id: this.state.selectedclass.value
      },
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        this.props.parentCallback(response.data.data);
        notyf.success('Вы создали Продукт')
      })
      .catch(error => {
        console.log(error);
      });
  };

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  render() {
    const { model } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Главная Информация</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.CreateProduct} className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Класс товара</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <ClassIntegrationReactSelect
                        classFunction = {this.ClassCallbackFunction}
                        classes={this.state.classes}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Бренд</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <BrandIntegrationReactSelect 
                      brandFunction={this.BrandCallbackFunction}
                      brands={this.state.brands} />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Модель</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <Input
                        name="model"
                        value={model}
                        onChange={this.handleChange}
                        type="text"
                        id="text-input"
                        placeholder=""
                      />
                      <FormText color="muted">Название модели товара</FormText>
                    </Col>
                  </FormGroup>

                

                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> Сохранить
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default InfoProduct;
