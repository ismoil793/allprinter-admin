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
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import FeatureIntegrationReactSelect from "../../../Catalog/OptionValues/FeatureSuggest";
import { httpGet, httpPost } from "../../../../api";
import UpdateCharacteristicsIntegrationReactSelect from "./CharacteristicSuggest";
import { Link } from "react-router-dom";
import OptionSuggest from "./SuggestOption";
class UpdateCharacter extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,

      features: [],
      selected: [],
      old_selected: [],

      active: 1,
      visible: 1,
      feature_ru: "",
      feature_uz: "",
      feature_en: "",
      feature_value_ru: "",
      feature_value_uz: "",
      feature_value_en: "",
      feature_show: false,
      value_show: false,
      selectedfeature: null
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

  componentWillReceiveProps() {
    let a = [];
    if (this.props.features && this.props.features.length) {
      for (let i = 0; i < this.props.features.length; i++) {

        if (this.props.features[i].selected_value) {
          a.push(this.props.features[i].selected_value.id);
        } else {
          a.push(this.props.features[i].selected_value);
        }
      }
    }
    this.setState({
      features: this.props.features,
      selected: a
    });
  }

  componentDidUpdate(prevProps) {
    // Популярный пример (не забудьте сравнить пропсы):
    if (this.props.features !== prevProps.features) {
      this.setState({
        features: this.props.features,
      });
    }
  }
  // componentDidMount() {
  //   this.getFeatures();
  // }

  // getFeatures = () => {
  //   httpGet({
  //     url: "api/admin/feature",
  //     params: {
  //       total: 1
  //     }
  //     })
  //     .then(response => {
  //       this.setState({
  //         features: response.data.data
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleFeature = e => {
    this.setState(prevState => ({
      feature_show: !prevState.feature_show,
      value_show: false
    }));
  };

  toggleValue = e => {
    this.setState(prevState => ({
      value_show: !prevState.value_show,
      feature_show: false
    }));
  };

  FeatureCallbackFunction = childData => {
    this.setState({ selectedfeature: childData });
  };

  AddFeatureValue = e => {
    const notyf = new Notyf();
    e.preventDefault();

    httpPost({
      url: "api/admin/value/create",
      data: {
        feature_id: this.state.selectedfeature.value,
        name: {
          ru: this.state.feature_value_ru,
          uz: this.state.feature_value_uz,
          en: this.state.feature_value_en
        },
        active: this.state.active,
        visible: this.state.visible
      }
    })
      .then(response => {
        notyf.success(`Вы добавили значение ${this.state.feature_value_ru}`);
        this.props.getProduct()
      })
      .catch(error => {
        console.log(error);
      });
  };

  AddFeature = e => {
    const notyf = new Notyf();

    e.preventDefault();

    httpPost({
      url: "api/admin/feature/create",
      data: {
        name: {
          ru: this.state.feature_ru,
          uz: this.state.feature_uz,
          en: this.state.feature_en
        },
        active: this.state.active,
        visible: this.state.visible
      }
    })
      .then(response => {
        this.Attach(response.data.data.id)
        this.props.getProduct()
        notyf.success(`Вы добавили характеристику ${this.state.feature_ru}`);
        this.setState({
          feature_ru: "",
          feature_uz: "",
          feature_en: ""
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  CallbackFunction = (childData, index) => {
    let array = this.state.selected;
    array[index] = childData;
    this.setState({ selected: array });

  };

  Attach = e => {

    const notyf = new Notyf();
    httpPost({
      url: `api/admin/product/update/${this.props.id}`,
      data: {
        layered_features: [e]
      }
    })
      .then(response => {
        notyf.success("Вы обновили характеристики");
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateProduct = e => {
    e.preventDefault();
    const notyf = new Notyf();
    httpPost({
      url: `api/admin/product/update/${this.props.id}`,
      data: {
        features: this.state.selected.filter(Boolean),

      }
    })
      .then(response => {
        notyf.success("Вы обновили характеристики");

      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    if (this.state.features && this.state.features.length)

      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="12">
              <Card>
                <CardHeader>
                  <Row>
                    {" "}
                    <Col xs="12" md="5">
                      <strong>Добавить Характеристики/Значения</strong>
                    </Col>
                    <Col md="3">
                      <Button onClick={this.toggleFeature} color="ghost-success">
                        <i className="fa fa-lightbulb-o"></i>&nbsp;Добавить
                      Характеристику
                    </Button>
                    </Col>
                    <Col md="3">
                      <Button
                        onClick={this.toggleValue}
                        color="ghost-danger"
                        className="btn-pill"
                      >
                        <i className="fa fa-lightbulb-o"></i>&nbsp;Добавить
                      значение
                    </Button>
                    </Col>
                  </Row>
                </CardHeader>

                {this.state.feature_show ? (
                  <Form onSubmit={this.AddFeature} className="form-horizontal">
                    <CardBody>
                      <FormGroup row>
                        <Col md="4">
                          <Label htmlFor="text-input">
                            Название Характеристики
                        </Label>
                          <Input
                            type="text"
                            id="text-input"
                            name="feature_ru"
                            value={this.state.feature_ru}
                            onChange={this.handleChange}
                            placeholder=""

                          />
                          <FormText color="muted">ru</FormText>
                        </Col>
                        <Col md="4">
                          <Label htmlFor="text-input">
                            Название Характеристики
                        </Label>
                          <Input
                            type="text"
                            id="text-input"
                            name="feature_uz"
                            value={this.state.feature_uz}
                            onChange={this.handleChange}
                            placeholder=""

                          />
                          <FormText color="muted">uz</FormText>
                        </Col>
                        <Col md="4">
                          <Label htmlFor="text-input">
                            Название Характеристики
                        </Label>
                          <Input
                            type="text"
                            id="text-input"
                            name="feature_en"
                            value={this.state.feature_en}
                            onChange={this.handleChange}
                            placeholder=""

                          />
                          <FormText color="muted">en</FormText>
                        </Col>
                      </FormGroup>
                    </CardBody>
                    <CardFooter>
                      <Button type="submit" size="sm" color="primary">
                        <i className="fa fa-dot-circle-o"></i> Сохранить
                    </Button>
                    </CardFooter>
                  </Form>
                ) : null}

                {this.state.value_show ? (
                  <Form
                    onSubmit={this.AddFeatureValue}
                    className="form-horizontal"
                  >
                    <CardBody>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="select">Характеристика</Label>
                        </Col>
                        <Col xs="9" md="9">
                          <Row>
                            <Col md="9">

                              <OptionSuggest
                                callbackFunction={this.FeatureCallbackFunction}
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
                                  name="feature_value_ru"
                                  value={this.state.feature_value_ru}
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
                                  name="feature_value_uz"
                                  value={this.state.feature_value_uz}
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
                                  name="feature_value_en"
                                  value={this.state.feature_value_en}
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
                ) : null}
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col md="4">
                      <strong>Характеристики</strong>
                    </Col>
                    <Col md="4">
                      <Input type="select" name="select" id="select">
                        <option value="1">ru</option>
                        <option value="2">en</option>
                        <option value="3">uz</option>
                      </Input>
                    </Col>
                    <Col md="4">
                      <strong>
                        {this.props.brand ? this.props.brand.name : null}{" "}
                        {this.props.class ? this.props.class.name : null}{" "}
                        {this.props.model}
                      </strong>
                    </Col>
                  </Row>
                </CardHeader>
                <Form onSubmit={this.updateProduct} className="form-horizontal">
                  <CardBody>
                    {this.props.features ? (
                      this.props.features.map((feature, index) => (
                        <FormGroup key={feature.id} row>
                          <Col md="3">
                            <Input
                              type="text"
                              id="text-input"
                              value={feature.name}
                              placeholder=""
                            />
                          </Col>
                          <Col xs="12" md="9">
                            <UpdateCharacteristicsIntegrationReactSelect
                              callbackFunction={this.CallbackFunction}
                              index={index}
                              feature_values={feature.values}
                              selected_value={feature.selected_value}
                            />
                          </Col>
                        </FormGroup>
                      ))
                    ) : (
                        <FormGroup row>
                          <Col md="3">
                            <Input
                              type="text"
                              id="text-input"
                              placeholder="Характеристики отсуствуют"
                            />
                          </Col>
                        </FormGroup>
                      )}
                  </CardBody>

                  <CardFooter>
                    <Button type="submit" size="sm" color="primary">
                      <i className="fa fa-dot-circle-o"></i> Сохранить
                  </Button>
                  </CardFooter>
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
    return (
      <div>
        Загрузка...
      </div>
    )
  }
}

export default UpdateCharacter;
