import React, { Component } from 'react';
import { httpGet, httpPost } from "../../../api";
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
  Row,
} from 'reactstrap';
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import Select from 'react-select'

class UpdateValueOptions extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      ru: '',
      uz: '',
      en: '',
      features: [],
      feature_id: {
        value: '',
        label: ''
      },
      active: 1,
      visible: 1,
    };
  }

  componentWillMount() {
    if (this.props.location.feature_value_id !== undefined) {
      localStorage.setItem("feature_value_id", this.props.location.feature_value_id);
    }
  }


  componentDidMount() {
    httpGet({
      url: "api/admin/feature",
      params: {
        per_page: 1000
      }
    })
      .then(response => {
        const features = []
        for (let i = 0; i < response.data.data.length; i++) {
          features.push({ value: response.data.data[i].id, label: response.data.data[i].name.ru })
        }
        this.setState({
          features: features
        });
      })
      .catch(error => {
        console.log(error);
      });


    httpGet({
      url: 'api/admin/value',
      params: {
        feature_value_id: localStorage.getItem("feature_value_id")
      }
    })
      .then(response => {
        this.setState({
          ru: response.data.data.name.ru,
          uz: response.data.data.name.uz,
          en: response.data.data.name.en,
          feature_id: {
            label: response.data.data.feature.name.ru,
            value: response.data.data.feature_id
          }
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = feature_id => {
    this.setState({ feature_id });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }


  SubmitHandler = e => {
    const notyf = new Notyf()
    e.preventDefault();
    httpPost({
      url: `api/admin/value/update/${localStorage.getItem("feature_value_id")}`,
      data: {
        feature_id: this.state.feature_id.value,
        name: {
          ru: this.state.ru,
          uz: this.state.uz,
          en: this.state.en
        },
        active: this.state.active,
        visible: this.state.visible
      }
    })
      .then(response => {
        notyf.success('Вы обновили значение характеристики')
      })
      .catch(error => {
        console.log(error);
      });
  };


  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  render() {
    return (
      <div className="animated fadeIn">

        <Row>
          <Col xs="12" md="12">
            <Card>
              <Form onSubmit={this.SubmitHandler} className="form-horizontal">
                <CardHeader>
                  <strong>Значение Характеристик</strong>
                </CardHeader>
                <CardBody>



                  <FormGroup row>

                    <Col md="3">
                      <Label htmlFor="select">Характеристика</Label>
                    </Col>
                    <Col xs="9" md="9">
                      <Row>
                        <Col md="9">
                          <Select
                            placeholder=''
                            value={this.state.feature_id}
                            onChange={this.handleChange}
                            options={this.state.features}
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

                            <Input type="text" id="text-input" name="ru" value={this.state.ru} onChange={this.changeHandler} placeholder="" />
                            <FormText color="muted">ru</FormText>
                          </Col>
                        </FormGroup>
                      </Col>

                      <Col md="3">
                        <FormGroup row>
                          <Col md="12">

                            <Input type="text" id="text-input" name="uz" value={this.state.uz} onChange={this.changeHandler} placeholder="" />
                            <FormText color="muted">uz</FormText>
                          </Col>
                        </FormGroup>
                      </Col>


                      <Col md="3">
                        <FormGroup row>
                          <Col md="12">
                            <Input type="text" id="text-input" name="en" value={this.state.en} onChange={this.changeHandler} placeholder="" />
                            <FormText color="muted">en</FormText>
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Сохранить</Button>
                  <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i>Сбросить</Button>
                </CardFooter>
              </Form>
            </Card>

          </Col>

        </Row>

      </div>
    );
  }
}

export default UpdateValueOptions;

