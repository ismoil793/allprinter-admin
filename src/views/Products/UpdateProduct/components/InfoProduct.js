import React, {Component} from "react";

import {Link} from 'react-router-dom'
import {httpGet, httpPost} from "../../../../api";
import {Notyf} from "notyf";
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
  FormText,
  Input,
  Label,
  Row
} from "reactstrap";
import UpdateClassIntegrationReactSelect from "./ClassSuggest";
import UpdateBrandIntegrationReactSelect from "./BrandSuggest";


class UpdateInfoProduct extends Component {
  static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      classes: [],
      brands: [],
      selectedbrand: {},
      selectedclass: {},
      model: '',
      collapse: true,
      fadeIn: true,
      timeout: 300,
      productData: []
    };
  }


  componentDidMount() {

    httpGet({
      url: "api/admin/product",
      params: {
        product_id: localStorage.getItem('id')
      }
    })
      .then(response => {
        this.setState({
          model: response.data.data.model
        });
      })
      .catch(error => {
        console.log(error);
      });
    httpGet({
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

    httpGet({
      url: "api/admin/brand",
      params: {
        total: 1
      }
    })
      .then(response => {
        this.setState({
          brands: response.data.data,
          model: this.props.model
        });
      })
      .catch(error => {
        console.log(error);
      });


  }

  handleBack = () => {
    this.props.history.goBack()
  }

  handleChange = e => {
    // this.props
    this.setState({[e.target.name]: e.target.value});
  };

  BrandCallbackFunction = childData => {
    alert(JSON.stringify(childData))
    this.setState({selectedbrand: childData});
  };

  ClassCallbackFunction = childData => {
    alert(JSON.stringify(childData                                                                                                                                 ))
    this.setState({selectedclass: childData});
  };

  UpdateProduct = e => {
    e.preventDefault();
    const notyf = new Notyf();
    httpPost({
      url: `api/admin/product/update/${this.props.id}`,
      data: {
        brand_id: this.state.selectedbrand ? this.state.selectedbrand.value : this.props.brand.id,
        model: this.state.model,
        class_id: this.state.selectedclass ? this.state.selectedclass.value : this.props.class.id
      },
      header: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        notyf.success("Вы обновили Продукт");
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
    const {model} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="4"> <strong>Главная Информация</strong></Col>
                  <Col md="4"></Col>
                  <Col
                    md="4"><strong>{this.props.brand ? this.props.brand.name : null} {this.props.class ? this.props.class.name : null} {this.props.model}</strong></Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.UpdateProduct} className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Класс товара</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <UpdateClassIntegrationReactSelect
                        selected={this.props.class ? this.props.class.name : null}
                        classFunction={this.ClassCallbackFunction}
                        classes={this.state.classes}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Бренд</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <UpdateBrandIntegrationReactSelect
                        selectedBrand={this.props.brand ? this.props.brand.name : null}
                        brandFunction={this.BrandCallbackFunction}
                        brands={this.state.brands}
                      />
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
              <CardFooter>
                <Link to="/buttons/products">
                  <Button size="sm" color="danger">
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

export default UpdateInfoProduct;
