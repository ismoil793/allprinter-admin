import React, { Component } from "react";
import { httpGet, httpPost } from "../../../api";
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
import UpdateParentCategory from "./UpdateCheckCategory";
import UpdateCategoryOptionIntegrationReactSelect from "./UpdateFeatureSuggest";

class UpdateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: "ru",
      ru: "",
      uz: "",
      en: "",
      image: null,
      slug: "",
      icon: null,
      wicon: null,
      image_preview: "",
      icon_preview: "",
      wicon_preview: "",
      parent_id: "",
      visible: 1,
      active: 1,
      features: [],
      feature_ids: [],
      selected_features: [],
      selected_parent: null,
      description_ru: "",
      description_uz: '',
      description_en: '',
      meta_keywords: "",
      meta_title: "",
      meta_keywords_uz: '',
      meta_title_uz: '',
      meta_description_en: '',
      meta_keywords_en: '',
      meta_title_en: '',
      reference: '',
    };
  }

  componentWillMount() {
    if (this.props.location.category_id !== undefined) {
      localStorage.setItem("category_id", this.props.location.category_id);
    }
  }

  componentDidMount() {
    httpGet({
      url: "api/admin/feature",
      params: {
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

    httpGet({
      url: "api/admin/category",
      params: {
        category_id: localStorage.getItem("category_id")
      }
    })
      .then(response => {
        this.setState({
          ru: response.data.data.name.ru,
          uz: response.data.data.name.uz,
          en: response.data.data.name.en,
          slug: response.data.data.slug,
          image_preview: response.data.data.image
            ? response.data.data.image
            : null,
          icon_preview: response.data.data.icon
            ? response.data.data.icon.url
            : null,
          wicon_preview: response.data.data.wicon
            ? response.data.data.wicon.url
            : null,
          visible: response.data.data.visible,
          active: response.data.data.active,
          reference: response.data.data.reference,
          description_ru: response.data.data.description.ru,
          description_uz: response.data.data.description.uz,
          description_en: response.data.data.description.en,
          meta_description: response.data.data.meta_description.ru,
          meta_keywords: response.data.data.meta_keywords.ru,
          meta_title: response.data.data.meta_title.ru,
          meta_description_uz:  response.data.data.meta_description.uz ? response.data.data.meta_description.uz : '' ,
          meta_keywords_uz:  response.data.data.meta_keywords.uz ? response.data.data.meta_keywords.uz : '',
          meta_title_uz:  response.data.data.meta_title.uz ? response.data.data.meta_title.uz : '',
          meta_description_en: response.data.data.meta_description.en ?response.data.data.meta_description.en  : '',
          meta_keywords_en: response.data.data.meta_keywords.en ? response.data.data.meta_keywords.en : '' ,
          meta_title_en: response.data.data.meta_title.en ? response.data.data.meta_title.en : '',
          selected_features: response.data.data.features
            ? response.data.data.features
            : null,
          selected_parent: response.data.data.parent
            ? response.data.data.parent.id
            : ""
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  FeatureCallbackFunction = childData => {
    this.setState({
      feature_ids: childData ? childData.map(a => a.value) : null
    });
  };

  categoryCallbackFunction = childData => {
    this.setState({ parent_id: childData });
  };
  changeImageHandler = e => {
    this.setState({
      image: e.target.files[0],
      image_preview: URL.createObjectURL(e.target.files[0])
    });
  };

  changeIconHandler = e => {
    this.setState({
      icon: e.target.files[0],
      icon_preview: URL.createObjectURL(e.target.files[0])
    });
  };

  changeWiconHandler = e => {
    this.setState({
      wicon: e.target.files[0],
      wicon_preview: URL.createObjectURL(e.target.files[0])
    });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  SubmitHandler = e => {
    const notyf = new Notyf();
    let formData = new FormData();
    formData.append("name[ru]", this.state.ru);
    if (this.state.uz) {
      formData.append("name[uz]", this.state.uz);
    }
    if (this.state.en) {
      formData.append("name[en]", this.state.en);
    }

    formData.append("active", this.state.active);
    formData.append("visible", this.state.visible);

    if (this.state.parent_id) {
      formData.append("parent_id", this.state.parent_id);
    } else {
      formData.append("parent_id", this.state.selected_parent);
    }

    if (this.state.image) {
      formData.append("image", this.state.image);
    }
    if (this.state.icon) {
      formData.append("icon", this.state.icon);
    }
    if (this.state.wicon) {
      formData.append("wicon", this.state.wicon);
    }
    if (this.state.slug) {
      formData.append("slug", this.state.slug);
    }

    formData.append("reference", this.state.reference);


    if (this.state.description_ru) {
      formData.append("description[ru]", this.state.description_ru);
    }
    if (this.state.description_en) {
      formData.append("description[en]", this.state.description_en);
    }
    if (this.state.description_uz) {
      formData.append("description[uz]", this.state.description_uz);
    }

    if (this.state.meta_title) {
      formData.append("meta_title[ru]", this.state.meta_title);
    }
    if (this.state.meta_keywords) {
      formData.append("meta_keywords[ru]", this.state.meta_keywords);
    }


    if (this.state.meta_title_uz) {
      formData.append("meta_title[uz]", this.state.meta_title_uz);
    }
    if (this.state.meta_keywords_uz) {
      formData.append("meta_keywords[uz]", this.state.meta_keywords_uz);
    }
    if (this.state.meta_description_uz) {
      formData.append("meta_description[uz]", this.state.meta_description_uz);
    }


    if (this.state.meta_title_en) {
      formData.append("meta_title[en]", this.state.meta_title_en);
    }
    if (this.state.meta_keywords_en) {
      formData.append("meta_keywords[en]", this.state.meta_keywords_en);
    }
    if (this.state.meta_description_en) {
      formData.append("meta_description[en]", this.state.meta_description_en);
    }
    if (this.state.feature_ids) {
      for (let i = 0; i < this.state.feature_ids.length; i++) {
        formData.append("feature_ids[]", this.state.feature_ids[i]);
      }
    }

    // for (var pair of formData.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]);
    // }

    e.preventDefault();

    httpPost({
      url: `api/admin/category/update/${localStorage.getItem("category_id")}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        console.log(response);
        notyf.success("Вы обновили категорию");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { ru, slug } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="12" md="2">
                    <strong>Обновить категорию</strong>
                  </Col>
                </Row>
              </CardHeader>

              <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                  <Row>
                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Название Категории</Label>
                          <Input
                            type="text"
                            name="ru"
                            placeholder=""
                            value={ru}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">ru</FormText>
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Название Категории</Label>
                          <Input
                            type="text"
                            name="uz"
                            placeholder=""
                            value={this.state.uz}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">uz</FormText>
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Название Категории</Label>
                          <Input
                            type="text"
                            name="en"
                            placeholder=""
                            value={this.state.en}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">en</FormText>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                    <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Описание</Label>
                          <Input
                            type="text"
                            name="description_ru"
                            placeholder=""
                            value={this.state.description_ru}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">ru</FormText>
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="12">
                    <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Описание</Label>
                          <Input
                            type="text"
                            name="description_uz"
                            placeholder=""
                            value={this.state.description_uz}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">uz</FormText>
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="12">
                    <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Описание</Label>
                          <Input
                            type="text"
                            name="description_en"
                            placeholder=""
                            value={this.state.description_en}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">en</FormText>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  {/*<Row>*/}
                  {/*  <Col md="12">*/}
                  {/*    <FormGroup row>*/}
                  {/*      <Col md="3">*/}
                  {/*        <Label htmlFor="file-input">*/}
                  {/*          Добавить изображение*/}
                  {/*        </Label>*/}
                  {/*      </Col>*/}
                  {/*      <Col xs="12" md="3">*/}
                  {/*        <Input*/}
                  {/*          type="file"*/}
                  {/*          id="file-input"*/}
                  {/*          onChange={this.changeImageHandler}*/}
                  {/*        />*/}
                  {/*      </Col>*/}
                  {/*      <Col xs="12" md="6">*/}
                  {/*        {this.state.image_preview ? (*/}
                  {/*          <img*/}
                  {/*            style={{ width: "50%" }}*/}
                  {/*            src={this.state.image_preview}*/}
                  {/*            alt="Чего"*/}
                  {/*          />*/}
                  {/*        ) : (*/}
                  {/*          "Изображение отсуствует в данной категории"*/}
                  {/*        )}*/}
                  {/*      </Col>*/}
                  {/*    </FormGroup>*/}
                  {/*  </Col>*/}
                  {/*</Row>*/}

                  {/*<Row>*/}
                  {/*  <Col md="12">*/}
                  {/*    <FormGroup row>*/}
                  {/*      <Col md="3">*/}
                  {/*        <Label htmlFor="file-input">*/}
                  {/*          Добавить иконку для Mobile*/}
                  {/*        </Label>*/}
                  {/*      </Col>*/}
                  {/*      <Col xs="12" md="3">*/}
                  {/*        <Input*/}
                  {/*          type="file"*/}
                  {/*          id="file-input"*/}
                  {/*          name="icon"*/}
                  {/*          onChange={this.changeIconHandler}*/}
                  {/*        />*/}
                  {/*      </Col>*/}

                  {/*      <Col xs="12" md="6">*/}
                  {/*        {this.state.icon_preview ? (*/}
                  {/*          <img*/}
                  {/*            style={{ width: "20%" }}*/}
                  {/*            src={this.state.icon_preview}*/}
                  {/*            alt="Чего"*/}
                  {/*          />*/}
                  {/*        ) : (*/}
                  {/*          "Мобильная иконка отсуствует в данной категории"*/}
                  {/*        )}*/}
                  {/*      </Col>*/}
                  {/*    </FormGroup>*/}
                  {/*  </Col>*/}
                  {/*</Row>*/}

                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="file-input">
                            Добавить изображение{/* для Web*/}
                          </Label>
                        </Col>
                        <Col xs="12" md="3">
                          <Input
                            type="file"
                            id="file-input"
                            name="wicon"
                            onChange={this.changeWiconHandler}
                          />
                        </Col>
                        <Col xs="12" md="6">
                          {this.state.wicon_preview ? (
                            <img
                              style={{ width: "20%" }}
                              src={this.state.wicon_preview}
                              alt="Чего"
                            />
                          ) : (
                            "Web иконка отсуствует в данной категории"
                          )}
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Название URL</Label>
                        </Col>
                        <Col md="9">
                          <Input
                            type="text"
                            id="text-input"
                            name="slug"
                            placeholder=""
                            value={slug}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">slug</FormText>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Alifshop - Категории</Label>
                        </Col>
                        <Col md="9">
                          <Input
                            type="text"
                            id="text-input"
                            name="reference"
                            placeholder=""
                            value={this.state.reference}
                            onChange={this.changeHandler}
                          />

                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>


                  <Row>
                  <Col md="12">
                    <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Локализация meta данных</Label>
                        </Col>
                        <Col md="9">
                        <Input type="select" name="locale" value={this.state.locale}  onChange={this.changeHandler} id="select">
                        <option value="">Выберите язык </option>
                          <option value="ru">ru</option>
                          <option value="en">en</option>
                          <option value="uz">uz</option>
                        </Input>

                        </Col>
                      </FormGroup>
                    </Col>
                    {this.state.locale === "ru" ? (
                      <>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Мета title</Label>
                        </Col>
                        <Col md="9">
                          <Input
                            type="text"
                            id="text-input"
                            name="meta_title"
                            placeholder=""
                            value={this.state.meta_title}
                            onChange={this.changeHandler}
                          />

                        </Col>
                      </FormGroup>
                    </Col>

                   <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Мета keywords</Label>
                        </Col>
                        <Col md="9">
                          <Input
                            type="text"
                            id="text-input"
                            name="meta_keywords"
                            placeholder=""
                            value={this.state.meta_keywords}
                            onChange={this.changeHandler}
                          />

                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Мета desсription</Label>
                        </Col>
                        <Col md="9">
                          <Input
                            type="text"
                            id="text-input"
                            name="meta_description"
                            placeholder=""
                            value={this.state.meta_description}
                            onChange={this.changeHandler}
                          />

                        </Col>
                      </FormGroup>
                    </Col>
                </>) : this.state.locale==="uz" ? (
                  <>
                  <Col md="12">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Мета title</Label>
                    </Col>
                    <Col md="9">
                      <Input
                        type="text"
                        id="text-input"
                        name="meta_title_uz"
                        placeholder=""
                        value={this.state.meta_title_uz}
                        onChange={this.changeHandler}
                      />

                    </Col>
                  </FormGroup>
                </Col>

               <Col md="12">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Мета keywords</Label>
                    </Col>
                    <Col md="9">
                      <Input
                        type="text"
                        id="text-input"
                        name="meta_keywords_uz"
                        placeholder=""
                        value={this.state.meta_keywords_uz}
                        onChange={this.changeHandler}
                      />

                    </Col>
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Мета desсription</Label>
                    </Col>
                    <Col md="9">
                      <Input
                        type="text"
                        id="text-input"
                        name="meta_description_uz"
                        placeholder=""
                        value={this.state.meta_description_uz}
                        onChange={this.changeHandler}
                      />

                    </Col>
                  </FormGroup>
                </Col>

                </>
                ) : (
                  <>
                  <Col md="12">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Мета title</Label>
                    </Col>
                    <Col md="9">
                      <Input
                        type="text"
                        id="text-input"
                        name="meta_title_en"
                        placeholder=""
                        value={this.state.meta_title_en}
                        onChange={this.changeHandler}
                      />

                    </Col>
                  </FormGroup>
                </Col>

               <Col md="12">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Мета keywords</Label>
                    </Col>
                    <Col md="9">
                      <Input
                        type="text"
                        id="text-input"
                        name="meta_keywords_en"
                        placeholder=""
                        value={this.state.meta_keywords_en}
                        onChange={this.changeHandler}
                      />

                    </Col>
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Мета desсription</Label>
                    </Col>
                    <Col md="9">
                      <Input
                        type="text"
                        id="text-input"
                        name="meta_description_en"
                        placeholder=""
                        value={this.state.meta_description_en}
                        onChange={this.changeHandler}
                      />

                    </Col>
                  </FormGroup>
                </Col>
                </>
                )}
                </Row>



                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Главная категория</Label>
                        </Col>
                        <Col md="9">
                          <UpdateParentCategory
                            categoryFunction={this.categoryCallbackFunction}
                            selected_parent={this.state.selected_parent}
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
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

export default UpdateCategory;
