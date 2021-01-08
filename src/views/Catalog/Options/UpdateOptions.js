import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { httpGet, httpPost } from "../../../api";
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

class UpdateOptions extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      ru:'',
      en:'',
      uz:'',
      active: 1,
      visible: 1,
      product_count: null,
      value_count:null,
      position:null,
      id:null
    };
  }

  componentDidMount() {
    httpGet({
      url: 'api/admin/feature',
      params: {
       feature_id: this.props.location.feature_id
        }
      })
      .then(response => {
   
        this.setState({
            ru: response.data.data.name.ru, 
            uz: response.data.data.name.uz,
            en: response.data.data.name.en,
            product_count: response.data.data.product_count,
            id:response.data.data.id,
            value_count:response.data.data.value_count,
            position:response.data.data.position
        })
       
      })
      .catch(error => {
        console.log(error);
      });
  }

  changeHandler = (e) =>{
    this.setState({[e.target.name]: e.target.value })
}

  SubmitHandler = (e) => {
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

    e.preventDefault()
    
    httpPost({ 
      url:`api/admin/feature/update/${this.props.location.feature_id}`,
      data: {
        name:{
          ru: this.state.ru,
          en: this.state.en,
          uz: this.state.uz
        },
        active: this.state.active,
        visible: this.state.visible
        }
      }
    )
    .then(response => {
    
      notyf.success('Вы обновили характеристику')
    })
    .catch(error =>{
      console.log(error)
    })
    
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    const {ru, uz, en} = this.state
    return (
      <div className="animated fadeIn">
        
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                  <Row> 
                    <Col xs="12" md="2">
                        <strong>Характеристики</strong> 
                     </Col>
                  </Row>
              </CardHeader>

              <CardBody>
                <Form onSubmit={this.SubmitHandler} className="form-horizontal">
                 <Row>
                   <Col md="4"> 
                   <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Название Характеристики</Label>
                      <Input type="text" id="text-input" name="ru" value={ru} onChange={this.changeHandler} placeholder="" />
                      <FormText color="muted">ru</FormText>
                    </Col>
                   </FormGroup>
                  </Col>
                  
                  <Col md="4">
                  <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Название Характеристики</Label>
                      <Input type="text" id="text-input"  name="uz" value={uz}  onChange={this.changeHandler} placeholder="" />
                      <FormText color="muted">uz</FormText>
                    </Col>
                   </FormGroup>
                  </Col>
                  

                  <Col md="4"> 
                  <FormGroup row>
                    <Col md="12">
                    <Label htmlFor="text-input">Название Характеристики</Label>
                      <Input type="text" id="text-input"  name="en" value={en}  onChange={this.changeHandler}  placeholder="" />
                      <FormText color="muted">en</FormText>
                    </Col>
                  </FormGroup>
                  </Col>
                 </Row>
                 <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Сохранить</Button>
              </Form>
              </CardBody>
            
            </Card>
           
          </Col>
        
        
        </Row>
     
 
      </div>
    );
  }
}

export default UpdateOptions;
