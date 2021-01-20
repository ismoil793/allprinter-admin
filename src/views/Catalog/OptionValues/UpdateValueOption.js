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
import UpdateOptionIntegrationReactSelect from './UpdateFeatureSuggest';

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
      feature_id: 82,
      active: 1,
      visible: 1,
      feature: '',
      selectedfeature: {}
    };
  }


  componentDidMount() {

    httpGet({
      url: "api/admin/feature"
    })
      .then(response => {

        this.setState({
          features: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });


    httpGet({
      url: 'api/admin/value',
      params: {
        feature_value_id: this.props.location.feature_value_id
      }
    })
      .then(response => {

        this.setState({
          ru: response.data.data.name.ru,
          uz: response.data.data.name.uz,
          en: response.data.data.name.en,
          feature: response.data.data.feature.name.ru,
        })

      })
      .catch(error => {
        console.log(error);
      });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
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
      url: `api/admin/value/${this.props.location.feature_value_id}`,
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

        notyf.success('Вы обновили значение характеристики')
      })
      .catch(error => {
        console.log(error);
      });
  };

  FeatureCallbackFunction = (childData) => {
    this.setState({ selectedfeature: childData })
  }


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
                          <UpdateOptionIntegrationReactSelect
                            callbackFunction={this.FeatureCallbackFunction}
                            features={this.state.features}
                            selected={this.state.feature} />
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
