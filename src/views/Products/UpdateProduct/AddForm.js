import React, { Component } from "react";
import { Link } from "react-router-dom";
import { httpPost } from "../../../api";
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
  Label,
  Row
} from "reactstrap";
import RelatedProductsIntegrationReactSelect from "./components/RelatedProducts";
import UpdateCheckCategory from "./components/CheckCategory";

class AddForms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      checked: [],
      related_product_ids: []
    };
  }

  updateProduct = e => {
    e.preventDefault();
    const notyf = new Notyf();
    httpPost({
      url: `api/admin/product/update/${this.props.id}`,
      data: {
        categories: this.state.checked,
        related_product_ids: [45, 46]
      }
    })
      .then(response => {
        notyf.success("Вы привязали категорию к данному продуктому");
      })
      .catch(error => {
        console.log(error);
      });
  };

  categoryCallbackFunction = childData => {
    this.setState({ checked: childData });
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
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <Form onSubmit={this.updateProduct} className="form-horizontal">
                <CardHeader>
                  <Row>
                    <Col md="4">
                      {" "}
                      <strong>Выберите </strong> Категорию>
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
                      <Label htmlFor="select">Выберите Категории</Label>
                    </Col>
                    <Col md="9">
                      <UpdateCheckCategory
                        categoryFunction={this.categoryCallbackFunction}
                      />
                    </Col>
                  </FormGroup>
                  {/*<hr></hr>*/}
                  {/*<FormGroup row>*/}
                  {/*  <Col md="3">*/}
                  {/*    <Label htmlFor="select">Сопутсвующие товары</Label>*/}
                  {/*  </Col>*/}
                  {/*  <Col xs="9" md="9">*/}
                  {/*    <Row>*/}
                  {/*      <RelatedProductsIntegrationReactSelect />*/}
                  {/*    </Row>*/}
                  {/*  </Col>*/}
                  {/*</FormGroup>*/}
                  {/*<Button type="submit" size="sm" color="primary">*/}
                  {/*  <i className="fa fa-dot-circle-o"></i> Сохранить*/}
                  {/*</Button>*/}
                </CardBody>
              </Form>

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

export default AddForms;
