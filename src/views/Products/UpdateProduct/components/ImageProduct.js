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
  Input,
  Label,
  Row
} from "reactstrap";

import "file-upload-with-preview/dist/file-upload-with-preview.min.css";
import { httpDelete, httpPost } from "../../../../api";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Link } from "react-router-dom";
class ImageProduct extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      files: [null],
      file: null
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  fileSelectedHandler = e => {
    if (e.target.files.length) {
      const images = [];
      for (let i = 0; i < e.target.files.length; i++) {
        images.push(e.target.files[i]);
      }

      this.setState({ files: images });
      this.setState({
        file: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  UpdateImage = e => {
    const notyf = new Notyf();
    let formData = new FormData();
    if (this.state.files) {
      for (let i = 0; i < this.state.files.length; i++)
        formData.append("images[]", this.state.files[i]);
    }

    e.preventDefault();

      httpPost({
        url: `api/admin/product/update/${this.props.id}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        notyf.success("Вы добавили Фотографии");
      })
      .catch(error => {
        console.log(error);
      });
  };

  DeleteImage = id => {
    // e.preventDefault();
    const notyf = new Notyf();
    httpDelete({
      url: `api/admin/product/image/delete/${this.props.id}`,
      data: {
        image_id: id
      }
    })
      .then(response => {
        notyf.success("Вы удалили фотографию");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <Form onSubmit={this.UpdateImage} className="form-horizontal">
                <CardHeader>
                  <Row>
                    <Col md="4">
                      {" "}
                      <strong>Image Form</strong>
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
                      <Label htmlFor="file-multiple-input">
                        Ввод нескольких изображений
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="file"
                        id="file-multiple-input"
                        onChange={this.fileSelectedHandler}
                        multiple
                      />
                    </Col>
                  </FormGroup>
                  {this.props.images
                    ? this.props.images.map((image, index) => (
                        <FormGroup key={image.id} row>
                          <Col md="3">
                            <Label htmlFor="file-multiple-input">
                              Изображение № {index + 1}
                            </Label>
                          </Col>
                          <Col xs="12" md="3">
                            {this.state.file ? (
                              <img
                                style={{ width: "50%" }}
                                src={this.state.file}
                                alt="Чего"
                              />
                            ) : (
                              <img
                                style={{ width: "50%" }}
                                src={image.url}
                                alt={image.id}
                              />
                            )}
                          </Col>
                          <Col sm xs="12" md="3" className="text-center mt-3">
                            <Button
                              onClick={() => this.DeleteImage(image.id)}
                              color="danger"
                              className="btn-pill"
                            >
                              <i className="fa fa-remove"></i>&nbsp;Удалить
                            </Button>
                          </Col>
                          <Col xs="12" md="3" className="mb-3 mb-xl-0"></Col>
                        </FormGroup>
                      ))
                    : null}

                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> Сохранить
                  </Button>
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

export default ImageProduct;
