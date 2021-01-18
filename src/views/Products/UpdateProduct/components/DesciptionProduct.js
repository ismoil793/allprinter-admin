import React, { Component } from "react";
import { httpGet, httpPost } from "../../../../api";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
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
import CKEditor from "ckeditor4-react";

export default class DescriptionProduct extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      description_short: "",
      isActive: '',
      data: "",
      weight: ""
    };
  }

  componentDidMount() {
    httpGet({
      url: "api/admin/product",
      params: {
        product_id: localStorage.getItem("id")
      }
    })
      .then(response => {
        this.setState({
          description_short: response.data.data.description_short
            ? response.data.data.description_short.ru
            : '',
          data: response.data.data.description
            ? response.data.data.description.ru
            : '',
          isActive: response.data.data.active,
          weight: response.data.data.weight
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = e => {
    const formData = {
      weight: this.state.weight,
      data: this.state.data,
      isActive: this.state.isActive,
      description_short: this.state.description_short,
      [e.target.name]: e.target.value
    };

    this.props.handleChildrenFormData('descriptionData', formData);

    this.setState({ [e.target.name]: e.target.value });
  };

  onEditorChange = evt => {
    const formData = {
      weight: this.state.weight,
      description_short: this.state.description_short,
      data: evt.editor.getData(),
      isActive: this.state.isActive,
    };

    this.props.handleChildrenFormData('descriptionData', formData);
    this.setState({
      data: evt.editor.getData()
    });
  };

  handleChange(changeEvent) {
    const formData = {
      weight: this.state.weight,
      data: changeEvent.target.value,
      description_short: this.state.description_short,
      isActive: this.state.isActive,
    };

    this.props.handleChildrenFormData('descriptionData', formData);
    this.setState({
      data: changeEvent.target.value
    });
  }

  updateProduct = e => {
    e.preventDefault();
    const notyf = new Notyf();
    httpPost({
      url: `api/admin/product/update/${this.props.id}`,
      data: {
        active: this.state.isActive,
        description_short: {
          ru: this.state.description_short
        },
        description: {
          ru: this.state.data
        },
        weight: this.state.weight
      }
    })
      .then(response => {
        notyf.success("Вы обновили описание к данному продукту");
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
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="4">
                    {" "}
                    <strong>Описание</strong>
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
                <Form onSubmit={this.updateProduct} className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Краткое Описание</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="textarea"
                        name="description_short"
                        value={this.state.description_short}
                        onChange={this.handleChange}
                        id="textarea-input"
                        rows="9"
                        placeholder="Краткий Текст..."
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Полное Описание</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <CKEditor
                        data={this.state.data}
                        onChange={this.onEditorChange}
                      />
                      {/* <label>
                        Change value:
                        <textarea defaultValue={this.state.data} onChange={this.handleChange} />
                    </label> */}
                      <EditorPreview data={this.state.data} />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="input">Вес товара</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange={this.handleChange}
                        value={this.state.weight}
                        type="text"
                        name="weight"
                      />
                      <FormText color="muted">kg</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Статус товара</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        onChange={this.handleChange}
                        value={this.state.isActive}
                        type="select"
                        name="isActive"
                        id="select"
                      >
                        <option>Выберите Статус товара</option>
                        <option value="1">Включен</option>
                        <option value="0">Выключен</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  {/*<Button type="submit" size="sm" color="primary">*/}
                  {/*  <i className="fa fa-dot-circle-o"></i> Сохранить*/}
                  {/*</Button>*/}
                </Form>
              </CardBody>
              {/*<CardFooter>*/}
              {/*  <Link to="/buttons/products">*/}
              {/*    <Button size="sm" color="danger">*/}
              {/*      <i className="fa fa-dot-circle-o"></i> Назад*/}
              {/*    </Button>*/}
              {/*  </Link>*/}
              {/*</CardFooter>*/}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

class EditorPreview extends Component {
  render() {
    return (
      <div className="editor-preview">
        <h2>Предварительный просмотр</h2>
        <div dangerouslySetInnerHTML={{ __html: this.props.data }}></div>
      </div>
    );
  }
}

EditorPreview.defaultProps = {
  data: ""
};

EditorPreview.propTypes = {
  data: PropTypes.string
};

// DescriptionProduct.propTypes = {
//   description_short: PropTypes.object.isRequired
// };
