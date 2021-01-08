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
import { httpGet, httpPost } from "../../../api";
import FeatureIntegrationReactSelect from "./FeatureSuggest";
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

class AddValueOptions extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      features: [],
      active: 1,
      visible: 1,
      feature_id: null,
      selectedfeature: null
    };
  }

  componentDidMount() {
      httpGet({
        url: "api/admin/feature",
        params:{
          total: 1
        }
      })
      .then(response => {
        this.setState({
          features: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  SubmitHandler = e => {
    const notyf = new Notyf()
    // let formData = new FormData()
    // formData.append('name.ru', this.state.ru)
    // if(this.state.uz){
    //   formData.append('name.uz', this.state.uz)
    // }
    // if(this.state.en){
    //   formData.append('name.en', this.state.en)
    // }
    // formData.append('visible', this.state.visible)
    // formData.append('active', this.state.active)

    e.preventDefault();

    httpPost({
      url: "api/admin/value/create",
      data: {
        feature_id: this.state.selectedfeature.value,
        name: {
          ru: this.state.ru
        },
        active: this.state.active,
        visible: this.state.visible
      }
    })
      .then(response => {
    
        notyf.success('Вы добавили значение характеристики')
      })
      .catch(error => {
        console.log(error);
      });
  };

  FeatureCallbackFunction = (childData) => {
    this.setState({selectedfeature: childData})
}

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
                <strong>Значение Характеристик</strong>
              </CardHeader>
              <Form onSubmit={this.SubmitHandler} className="form-horizontal">
                <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Характеристика</Label>
                    </Col>
                    <Col xs="9" md="9">
                      <Row>
                        <Col md="9">
                          <FeatureIntegrationReactSelect
                           callbackFunction = {this.FeatureCallbackFunction}
                            features={this.state.features}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Row>
                      <Col md="3">
                        <Label htmlFor="select">Значение</Label>
                      </Col>

                      <Col md="3">
                        <FormGroup row>
                          <Col md="12">
                            <Input
                              type="text"
                              id="text-input"
                              onChange={this.handleChange}
                              placeholder=""
                              name="ru" value={this.state.ru}
                            />
                            <FormText color="muted">ru</FormText>
                          </Col>
                        </FormGroup>
                      </Col>

                      <Col md="3">
                        <FormGroup row>
                          <Col md="12">
                            <Input
                              type="text"
                              id="text-input"
                              onChange={this.handleChange}
                              placeholder=""
                              name="uz" value={this.state.uz}
                            />
                            <FormText color="muted">uz</FormText>
                          </Col>
                        </FormGroup>
                      </Col>

                      <Col md="3">
                        <FormGroup row>
                          <Col md="12">
                            <Input
                              type="text"
                              id="text-input"
                              onChange={this.handleChange}
                              placeholder=""
                              name="en" value={this.state.en}
                            />
                            <FormText color="muted">en</FormText>
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup>
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

export default AddValueOptions;
