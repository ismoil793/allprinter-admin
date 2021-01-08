import React, { Component } from "react";
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
  FormText,
  Input,
  Label,
  Row
} from "reactstrap";

class AddBrands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: null,
      alif: '',
      reference: "",
      image_file: null
    };
  }

  changeImageHandler = e => {
    this.setState({ 
    image: e.target.files[0],
    image_file: URL.createObjectURL(e.target.files[0])
    });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  SubmitHandler = e => {
    const notyf = new Notyf();
    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("reference", this.state.reference);
    formData.append("alif", this.state.alif);

    if (this.state.image) {
      formData.append("image", this.state.image);
    }

    e.preventDefault();

      httpPost({
        url: "api/admin/brand/create", 
        data: formData, 
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        notyf.success("Вы добавили бренд");
        this.setState({
          name: "",
          image: null,
          reference: ""
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({
          name: "",
          image: null,
          reference: ""
        })
      });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="12" md="2">
                    <strong>Бренды</strong>
                  </Col>
                </Row>
              </CardHeader>

              <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Название Бренда</Label>
                          <Input
                            type="text"
                            name="name"
                            placeholder=""
                            value={this.state.name}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted"></FormText>
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">
                            Сокращенное название
                          </Label>
                          <Input
                            type="text"
                            name="reference"
                            placeholder=""
                            value={this.state.reference}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted"></FormText>
                        </Col>
                      </FormGroup>
                    </Col>

                
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Alifshop ID</Label>
                      
                          <Input
                            type="text"
                            id="text-input"
                            name="alif"
                            placeholder=""
                            value={this.state.alif}
                            onChange={this.changeHandler}
                          />
                        
                        </Col>
                      </FormGroup>
                    </Col>
              

                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="file-input">
                            Добавить изображение:
                          </Label>
                          <Input
                            type="file"
                            id="file-input"
                            onChange={this.changeImageHandler}
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                   { this.state.image_file ? (
                       <Col md="6">
                       <FormGroup row>
                         <Col md="12">
                         
                          <img style={{width:'50%'}} src={this.state.image_file ? this.state.image_file : null} alt="Бренд" />
                         </Col>
                       </FormGroup>
                     </Col>
                   ) : null }
                  
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> Сохранить
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

export default AddBrands;
