import React, { Component } from "react";
import { Link } from 'react-router-dom'
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



class SeoProduct extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      meta_title: {},
      meta_description: {},
      meta_keywords: {},
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }


  componentDidMount(){
    // setTimeout(() => {
    //   this.setState({
    //   meta_title: this.props.meta_title,
    //   meta_description: this.props.meta_description,
    //   meta_keywords: this.props.meta_keywords,
    //   });

    // }, 1000)

      httpGet({
        url:"api/admin/product",
        params: {
         product_id: localStorage.getItem('id')
        }
      })
      .then(response => {

        this.setState({
          meta_keywords: response.data.data.meta_keywords ? response.data.data.meta_keywords.ru : null,
          meta_description: response.data.data.meta_description.ru,
          meta_title: response.data.data.meta_title.ru
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = e => {
    this.props.handleChildrenFormData('meta', {
      meta_title: this.state.meta_title,
      meta_description: this.state.meta_description,
      meta_keywords: this.state.meta_keywords,
      [e.target.name]: e.target.value
    })
    this.setState({ [e.target.name]: e.target.value });
  };



  updateProduct = e => {
    e.preventDefault();
    const notyf = new Notyf();
    httpPost({
      url: `api/admin/product/update/${this.props.id}`,
      data: {
        meta_title: {
          ru: this.state.meta_title
        },
        meta_description: {
          ru: this.state.meta_description
        },
        meta_keywords: {
          ru: this.state.meta_keywords
        }
      }
    })
      .then(response => {
        notyf.success("Вы добавили Seo продукту");
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
  // console.log(this.state.meta_title)
  // console.log(this.state.meta_keywords)
  // console.log(this.state.meta_description)

  //   let meta_description_ru = ""
  //   let meta_title_ru = ""
  //   let meta_keywords_ru = ""



  //   if(this.state.meta_keywords){
  //    meta_keywords_ru= this.state.meta_keywords.ru
  //   }
  //   if(this.state.meta_title){
  //    meta_title_ru = this.state.meta_title.ru
  //   }

  //   if(this.state.meta_description){
  //     meta_description_ru = this.state.meta_description.ru
  //   }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
            <Form
                onSubmit={this.updateProduct}
                  className="form-horizontal"
                >
              <CardHeader>

                <Row>
                <Col md="4"><strong>Search Engine Optimization</strong></Col>
                <Col md="4"></Col>
                <Col md="4"><strong>{this.props.brand ? this.props.brand.name : null} {this.props.class ? this.props.class.name : null} {this.props.model}</strong></Col>
                </Row>
              </CardHeader>
              <CardBody>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Мета Заголовок</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="text-input"
                        name="meta_title"
                        value={this.state.meta_title}
                        onChange={this.handleChange}
                        placeholder=""
                      />
                      <FormText color="muted">Не более 70 слов</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Мета Описание</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="text-input"
                        name="meta_description"
                        value={this.state.meta_description}
                        onChange={this.handleChange}
                        placeholder=""
                      />
                      <FormText color="muted">Не более 150 слов</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">
                        Мета Ключивые слова
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="textarea"
                        name="meta_keywords"
                        value={this.state.meta_keywords}
                        onChange={this.handleChange}
                        id="textarea-input"
                        rows="9"
                        placeholder="Ключивые слова о   товаре..."
                      />
                    </Col>
                  </FormGroup>
                {/*  <Button type="submit" size="sm" color="primary">*/}
                {/*  <i className="fa fa-dot-circle-o"></i> Сохранить*/}
                {/*</Button>*/}
              </CardBody>


              </Form>
              {/*<CardFooter>*/}
              {/*  <Link to="/buttons/products">*/}
              {/*      <Button  size="sm" color="danger">*/}
              {/*        <i className="fa fa-dot-circle-o"></i> Назад*/}
              {/*      </Button>*/}
              {/*  </Link>*/}
              {/*</CardFooter>*/}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SeoProduct;
