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
import { httpPost } from "../../../../api";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

class SeoProduct extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  handleChange = e => {
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
    const { meta_description, meta_keywords, meta_title } = this.state;
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
                <strong>Search Engine Optimization</strong>
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
                        value={meta_title}
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
                        value={meta_description}
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
                        value={meta_keywords}
                        onChange={this.handleChange}
                        id="textarea-input"
                        rows="9"
                        placeholder="Ключивые слова о   товаре..."
                      />
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

export default SeoProduct;
