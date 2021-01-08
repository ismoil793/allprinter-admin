import React, { Component } from "react";
import { httpPost } from "../../../../api";
import PropTypes from 'prop-types';
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import {
  Button,
  Card,
  CardBody,
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

class DescriptionProduct extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      weight:'',
      description_short: '',
      data:'',
      isActive: null
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onEditorChange = ( evt ) =>{
    this.setState( {
        data: evt.editor.getData()
    } );
}

handleChange( changeEvent ) {
    this.setState( {
        data: changeEvent.target.value
    } );
}

  updateProduct = e => {
    e.preventDefault();
    const notyf = new Notyf()
    httpPost({
      url: `api/admin/product/update/${this.props.id}`,
      data: {
        active: this.state.isActive,
        description_short : {
         ru: this.state.description_short
        },
        description:{
          ru: this.state.data
        },
        weight: this.state.weight,
      }
    })
      .then(response => {
        notyf.success('Вы добавили описание к данному продукту')
     
      })
      .catch(error => {
        console.log(error);
      });
  };

      // Activation = (e) =>{
      //   e.preventDefault()
      //   this.setState({
      //     isActive: this.state.isActive
      //   });
      //   console.log(this.state.isActive)
      // }
 

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
                <strong>Описание</strong>
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
                      <CKEditor data={this.state.data} onChange={this.onEditorChange}/>
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
                      <Input onChange={this.handleChange} value={this.state.weight} type="text" name="weight" />
                      <FormText color="muted">kg</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Статус товара</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input onChange={this.handleChange} value={this.state.isActive} type="select" name="isActive" id="select">
                      <option value="2" >Выберите Статус товара</option>
                        <option value="1">Включен</option>
                        <option value="0">Выключен</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <Button type="submit" size="sm" color="primary">
                  <i className="fa fa-dot-circle-o"></i> Сохранить
                </Button>
                </Form>
                
              </CardBody>
              
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
              <div dangerouslySetInnerHTML={ { __html: this.props.data } }></div>
          </div>
      );
  }
}

EditorPreview.defaultProps = {
  data: ''
};

EditorPreview.propTypes = {
  data: PropTypes.string
};

export default DescriptionProduct;
