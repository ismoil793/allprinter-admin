import React, {Component} from "react";
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
import {httpPost} from "../../../../api";
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'

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
      file: []
    };
  }

  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  toggleFade() {
    this.setState(prevState => {
      return {fadeIn: !prevState};
    });
  }

  fileSelectedHandler = (e) => {
    if (e.target.files.length) {
      const images = []
      for (let i = 0; i < e.target.files.length; i++) {
        images.push(e.target.files[i])
      }

      if (this.props.id)
        this.UpdateImage(null, images)

      this.setState({
        files: images,
        file: URL.createObjectURL(e.target.files[0])
      })


      this.props.handleChildrenFormData('files', images)
    }
  }

  UpdateImage = (e, images) => {
    const notyf = new Notyf()
    let formData = new FormData()
    if (images) {
      for (let i = 0; i < images.length; i++)
        formData.append('images[]', images[i])
    }

    if (e) {
      e.preventDefault()
    }

    httpPost({
      url: `api/admin/product/update/${this.props.id}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        notyf.success('Вы добавили Фотографии')
      })
      .catch(error => {
        console.log(error)
      })

  }


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <Form
                onSubmit={this.UpdateImage}
                className="form-horizontal"
              >
                <CardHeader>
                  <strong>Изображение товара</strong>
                </CardHeader>
                <CardBody>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-multiple-input">
                        * Изображение товара
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

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-multiple-input">
                        Предварительный просмотр
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <img src={this.state.file} alt=""/>
                    </Col>
                  </FormGroup>

                </CardBody>
                {/*<CardFooter>*/}
                {/*  <Button type="submit" size="sm" color="primary">*/}
                {/*    <i className="fa fa-dot-circle-o"></i> Сохранить*/}
                {/*  </Button>*/}
                {/*  <Button type="reset" size="sm" color="danger">*/}
                {/*    <i className="fa fa-ban"></i> Сбросить*/}
                {/*  </Button>*/}
                {/*</CardFooter>*/}
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ImageProduct;
