import React, { Component } from "react";
import { httpGet, httpPost } from "../../api";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import CKEditor from "ckeditor4-react";
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
  FormText,
  Input,
  Label,
  Row
} from "reactstrap";


class UpdateNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ru: "",
      uz: "",
      en: "",
      
      image: null,
      back: null,
      image_preview: "",
      back_preview: "",
     
      status: null,
      device_type: null,

      data: "",
      description_short: "",

      meta_description: "",
      meta_keywords: "",
      meta_title: ""
    };
  }

  componentWillMount() {
    if (this.props.location.news_id !== undefined) {
      localStorage.setItem("news_id", this.props.location.news_id);
    }
  }

  componentDidMount() {
   
   
    httpGet({
      url: "api/admin/post",
      params: {
        post_id: localStorage.getItem("news_id")
      }
    })
      .then(response => {
       
        this.setState({
          ru: response.data.data.title.ru,
          uz: response.data.data.title.uz,
          en: response.data.data.title.en,
        
          image_preview: response.data.data.image
            ? response.data.data.image.url
            : null,
          back_preview: response.data.data.icon
            ? response.data.data.icon.url
            : null,
        
          device_type: response.data.data.for,
          status: response.data.data.status,

          description_short: response.data.data.description_short ? response.data.data.description_short.ru : '',
          data: response.data.data.description ? response.data.data.description.ru : '',


          meta_description: response.data.data.meta_description.ru,
          meta_keywords: response.data.data.meta_keywords.ru,
          meta_title: response.data.data.meta_title.ru,
         
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

 
  onEditorChange = ( evt ) => {
    this.setState({
        data: evt.editor.getData()
    });
}
 
  changeImageHandler = e => {
    this.setState({
      image: e.target.files[0],
      image_preview: URL.createObjectURL(e.target.files[0])
    });
  };


  changebackHandler = e => {
    this.setState({
      back: e.target.files[0],
      back_preview: URL.createObjectURL(e.target.files[0])
    });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  SubmitHandler = e => {
    const notyf = new Notyf();
    let formData = new FormData();
    formData.append("title[ru]", this.state.ru);
    if (this.state.uz) {
      formData.append("title[uz]", this.state.uz);
    }
    if (this.state.en) {
      formData.append("title[en]", this.state.en);
    }

    formData.append("for", this.state.device_type);
    formData.append("status", this.state.status);

  

    if (this.state.image) {
      formData.append("image", this.state.image);
    }
    if (this.state.back) {
      formData.append("background", this.state.back);
    }
   


    if (this.state.data) {
      formData.append("description[ru]", this.state.data);
    }

    if (this.state.description_short) {
      formData.append("description_short[ru]", this.state.description_short);
    }

    

    if (this.state.meta_title) {
      formData.append("meta_title[ru]", this.state.meta_title);
    }
    if (this.state.meta_keywords) {
      formData.append("meta_keywords[ru]", this.state.meta_keywords);
    }
    if (this.state.meta_description) {
      formData.append("meta_description[ru]", this.state.meta_description);
    }



    e.preventDefault();

    httpPost({
      url: `api/admin/post/update/${localStorage.getItem("news_id")}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
      
        notyf.success(`Вы обновили новость с id=${localStorage.getItem("news_id")}`);
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
              <CardHeader>
                <Row>
                  <Col xs="12" md="2">
                    <strong>Изменить Новость</strong>
                  </Col>
                </Row>
              </CardHeader>

              <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                  <Row>
                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Название новости</Label>
                          <Input
                            type="text"
                            name="ru"
                            placeholder=""
                            value={this.state.ru}
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">ru</FormText>
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Название новости</Label>
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
                          <Label htmlFor="text-input">Название новости</Label>
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
                        <Col md="3">
                          <Label htmlFor="textarea-input">
                            Краткое Описание
                          </Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="textarea"
                            name="description_short"
                            value={this.state.description_short}
                            onChange={this.changeHandler}
                            id="textarea-input"
                            rows="5"
                            placeholder="Краткий Текст..."
                          />
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Текст новости </Label>
                          <CKEditor
                            data={this.state.data}
                            onChange={this.onEditorChange}
                          />
                          <EditorPreview data={this.state.data} />
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="select">Выбрать устроиство</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            onChange={this.changeHandler}
                            value={this.state.device_type}
                            type="select"
                            name="device_type"
                            id="select"
                          >
                            <option value=""> Выберите тип устроиства </option>
                            <option value="1">Мобильные устройства</option>
                            <option value="2">Веб-сайт</option>
                            <option value="3">Оба устроиства</option>
                          </Input>
                        </Col>
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="select">Статус</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            onChange={this.changeHandler}
                            value={this.state.status}
                            type="select"
                            name="status"
                            id="select"
                          >
                            <option value=" "> Выберите статус </option>
                            <option value="1">Включить</option>
                            <option value="0">Выключить</option>
                          </Input>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="file-input">
                            Добавить изображение 
                          </Label>
                        </Col>
                        <Col xs="12" md="3">
                          <Input
                            type="file"
                            id="file-input"
                            onChange={this.changeImageHandler}
                          />
                        </Col>
                        <Col xs="12" md="6">
                          {this.state.image_preview ? (
                            <img
                              style={{ width: "40%" }}
                              src={this.state.image_preview}
                              alt="News"
                            />
                          ) : null}
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="file-input">
                            Добавить background изображение 
                          </Label>
                        </Col>
                        <Col xs="12" md="3">
                          <Input
                            type="file"
                            id="file-input"
                            onChange={this.changebackgroundHandler}
                          />
                        </Col>
                        <Col xs="12" md="6">
                          {this.state.background_preview ? (
                            <img
                              style={{ width: "20%" }}
                              src={this.state.background_preview}
                              alt="Чего"
                            />
                          ) : null}
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
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
                  </Row>

                  <Row>
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
                  </Row>

                  <Row>
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
  

export default UpdateNews;
