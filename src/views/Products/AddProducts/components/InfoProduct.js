import React, {Component} from "react";
import {httpGet, httpPost} from "../../../../api";
import {Notyf} from 'notyf'
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
      timeout: 300,

      CreateProduct: this.CreateProduct.bind(this)
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isCreateNewProduct) {
      prevState.CreateProduct();
      return null
    }
    return null
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
    this.setState({[e.target.name]: e.target.value});
  };


  BrandCallbackFunction = (childData) => {
    this.setState({selectedbrand: childData})
  }

  ClassCallbackFunction = (childData) => {
    this.setState({selectedclass: childData})
  }


  CreateProduct(e) {
    if (e) {
      e.preventDefault();
    }
    const notyf = new Notyf()

    const {descriptionData, files, categories, meta} = this.props.formData;

    let formData = files.length ? new FormData() : null;

    if (files.length) {
      for (let i = 0; i < files.length; i++)
        formData.append('images[]', files[i])
    }

    if (this.props.id) {
      httpPost({
        url: `api/admin/product/update/${this.props.id}`,
        data: {
          active: descriptionData.isActive,
          description_short: {
            ru: descriptionData.description_short
          },
          description: {
            ru: descriptionData.data
          },
          weight: descriptionData.weight,
          categories,
          meta_title: {
            ru: meta.meta_title
          },
          meta_description: {
            ru: meta.meta_description
          },
          meta_keywords: {
            ru: meta.meta_keywords
          }
        }
      })
        .then(response => {
          notyf.success('Информация продукта обновлена')

        })
        .catch(error => {
          console.log(error);
        });
    } else {
      httpPost({
        url: "api/admin/product/create",
        data: {
          brand_id: this.state.selectedbrand.value,
          model: this.state.model,
          class_id: this.state.selectedclass.value,
        },
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          this.props.parentCallback(response.data.data);

          if (formData) {
            httpPost({
              url: `api/admin/product/update/${response.data.data.id}`,
              data: formData,
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
          }

          httpPost({
            url: `api/admin/product/update/${response.data.data.id}`,
            data: {
              active: descriptionData.isActive,
              description_short: {
                ru: descriptionData.description_short
              },
              description: {
                ru: descriptionData.data
              },
              weight: descriptionData.weight,
              categories,
              ...meta
            }
          })
            .then(response => {
              notyf.success('Вы создали Продукт')
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }

    this.props.handleInfoProduct(false)
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
                <strong>Главная Информация</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.CreateProduct} className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">* Класс товара</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <ClassIntegrationReactSelect
                        classFunction={this.ClassCallbackFunction}
                        classes={this.state.classes}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">* Бренд</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <BrandIntegrationReactSelect
                        brandFunction={this.BrandCallbackFunction}
                        brands={this.state.brands}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">* Модель</Label>
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


                  {/*<Button type="submit" size="sm" color="primary">*/}
                  {/*  <i className="fa fa-dot-circle-o"></i> Сохранить*/}
                  {/*</Button>*/}
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
