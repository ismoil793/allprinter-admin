import React, {Component} from 'react';
import CheckCategory from '../AddProducts/components/CheckCategory';
import {httpPost} from "../../../api";
import {Notyf} from 'notyf'
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
  Label,
  Row,
} from 'reactstrap';
import RelatedProductsIntegrationReactSelect from './components/RelatedProducts';

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


  updateProduct = (e, childData) => {
    if (e) {
      e.preventDefault();
    }
    const notyf = new Notyf()

    httpPost({
      url: `api/admin/product/update/${this.props.id}`,
      data: {
        categories: childData,
        // related_product_ids: [45,46]
      }
    })
      .then(response => {
        this.props.parentCallback(response.data.data);
        notyf.success('Вы привязали категорию к данному продукту')
      })
      .catch(error => {
        console.log(error);
      });
  };

  categoryCallbackFunction = (childData) => {

    this.props.handleChildrenFormData('categories', childData)

    if (this.props.id) {
      this.updateProduct(null, childData)
    }
    this.setState({checked: childData})
  }


  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  toggleFade() {
    this.setState((prevState) => {
      return {fadeIn: !prevState}
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
                  <strong>Выберите </strong> Категорию
                </CardHeader>

                <CardBody>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Выберите Категории</Label>
                    </Col>
                    <Col md="9">
                      <CheckCategory categoryFunction={this.categoryCallbackFunction} category={this.props.category}/>
                    </Col>

                  </FormGroup>
                  {/*<hr></hr>*/}
                  {/*<FormGroup row>*/}
                  {/*   <Col md="3">*/}
                  {/*     <Label htmlFor="select">Сопутсвующие товары</Label>*/}
                  {/*   </Col>*/}
                  {/*   <Col xs="9" md="9">*/}
                  {/*   <Row>*/}
                  {/*   <RelatedProductsIntegrationReactSelect />*/}
                  {/*    </Row>*/}
                  {/*   </Col>*/}
                  {/* </FormGroup>*/}


                </CardBody>
                {/*<CardFooter>*/}
                {/*  <Button type="submit" size="sm" color="primary"><i*/}
                {/*    className="fa fa-dot-circle-o"></i> Сохранить</Button>*/}
                {/*  <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i>Сбросить</Button>*/}
                {/*</CardFooter>*/}
              </Form>
            </Card>

          </Col>

        </Row>

      </div>
    );
  }
}

export default AddForms;
