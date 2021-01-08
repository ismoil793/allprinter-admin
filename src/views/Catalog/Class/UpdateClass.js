import React, { Component } from 'react';
import { httpGet, httpPost } from "../../../api";
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
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


import UpdateCategoriesIntegrationReactSelect from './UpdateCategoriesSuggestions';

class UpdateClass extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      ru:'',
      uz:'',
      en:'',
      product_count: null,
      id: null,
      reference: '',
      categories:[],
      category: null,
      selected_category:''
     };
    
  }


  componentDidMount() {
    httpGet({
      url: "api/admin/category",
      params:{
        per_page: 200
      }
    })
    .then(response => {
      this.setState({
       categories: response.data.data,
      });
    })
    .catch(error => {
      console.log(error);
    });

    httpGet({
      url: 'api/admin/class',
      params: {
        class_id: this.props.location.class_id
        }
      })
      .then(response => {
        console.log(response.data.data);
        console.log("update");
        this.setState({
            ru: response.data.data.name.ru, 
            uz: response.data.data.name.uz,
            en: response.data.data.name.en,
            product_count: response.data.data.product_count,
            id:response.data.data.id,
            reference: response.data.data.reference,
            selected_category: response.data.data.category ? response.data.data.category.name.ru : null
        })
       
      })
      .catch(error => {
        console.log(error);
      });
  }
    
  changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value })
    }

    CategoryCallbackFunction = (childData) => {
      this.setState({category: childData})
  }


   SubmitHandler = (e) => {
    const notyf = new Notyf()
    let formData = new FormData()
    formData.append('name[ru]', this.state.ru)
    formData.append('category_id', this.state.category)
    formData.append('reference', this.state.reference)
    if(this.state.uz){
      formData.append('name[uz]', this.state.uz)
    }
    if(this.state.en){
      formData.append('name[en]', this.state.en)
    }

    e.preventDefault()
    
    httpPost({
      url: `api/admin/class/update/${this.props.location.class_id}`,
      data: formData, 
      headers: {
          'Content-Type': 'multipart/form-data'
        }}
    )
    .then(response => {
      console.log(response)
      notyf.success('Вы обновили бренд')
    })
    .catch(error =>{
      console.log(error)
    })
    
  }

  render() {

    return (
      <div className="animated fadeIn">
        
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                  <Row> 
                    <Col xs="12" md="2">
                        <strong>Классы</strong> 
                     </Col>
                  </Row>
              </CardHeader>

             
                <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                 <Row>
                   <Col md="4"> 
                   <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Название Класса</Label>
                      <Input
                      type="text" 
                      name="ru" placeholder="" 
                      value={this.state.ru}  
                      onChange={this.changeHandler}/>
                      <FormText color="muted">ru</FormText>
                    </Col>
                   </FormGroup>
                  </Col>

                 <Col md="4"> 
                   <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Название Класса</Label>
                      <Input
                      type="text" 
                      name="uz" placeholder="" 
                      value={this.state.uz}   
                      onChange={this.changeHandler}/>
                      <FormText color="muted">uz</FormText>
                    </Col>
                   </FormGroup>
                  </Col>

                  <Col md="4"> 
                   <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Название Класса</Label>
                      <Input
                      type="text" 
                      name="en" placeholder="" 
                      value={this.state.en}   
                      onChange={this.changeHandler}/>
                      <FormText color="muted">en</FormText>
                    </Col>
                   </FormGroup>
                  </Col> 

                  <Col md="4"> 
                   <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Сокращенное название</Label>
                      <Input
                      type="text" 
                      name="reference" placeholder="" 
                      value={this.state.reference}  
                      onChange={this.changeHandler}/>
                      <FormText color="muted">ru</FormText>
                    </Col>
                   </FormGroup>
                  </Col>

                  <Col md="8"> 
                   <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Привязать к категории</Label>
                    <UpdateCategoriesIntegrationReactSelect selectedCategory={this.state.selected_category} categoryFunction={this.CategoryCallbackFunction} category={this.state.categories}/>
                    </Col>
                   </FormGroup>
                  </Col>
                 
                 </Row>
               </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Сохранить</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Сбросить</Button>
              </CardFooter>
              </Form>
            
            </Card>
           
          </Col>
        
        
        </Row>
     
 
      </div>
    );
  }
}

export default UpdateClass;
