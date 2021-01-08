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
import CategoriesIntegrationReactSelect from './CategoriesSuggestions';



class AddClass extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      ru:'',
      uz:'',
      en:'',
      reference: '',
      status: 1,
      categories:[],
      category: null
     };
    
  }

  componentDidMount(){
    setTimeout(() => {
      this.getCategories()
    }, 100)
  }
  
  
  getCategories = () => {
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
  }

 CategoryCallbackFunction = (childData) => {
    this.setState({category: childData})
}


    
  changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value })
    }


   SubmitHandler = (e) => {
    const notyf = new Notyf()
    let formData = new FormData()
    formData.append('name[ru]', this.state.ru)
    formData.append('category_id', this.state.category)
    formData.append('reference', this.state.reference)
    formData.append('status', this.state.status)
    if(this.state.uz){
      formData.append('name[uz]', this.state.uz)
    }
    if(this.state.en){
      formData.append('name[en]', this.state.en)
    }

    e.preventDefault()
    
    httpPost({
      url: 'api/admin/class/create',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }}
    )
    .then(response => {
      console.log(response)
      notyf.success('Вы добавили класс')
      this.setState({
        ru:'',
        uz:'',
        en:'',
        reference: '',
        status: 1
      })
    })
    .catch(error =>{
      console.log(error)
      this.setState({
        ru:'',
        uz:'',
        en:'',
        reference: '',
        status: 1
      })
    })
    
  }

  render() {
console.log(this.state.categories)
console.log(this.state.category)
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
                     <CategoriesIntegrationReactSelect  categoryFunction={this.CategoryCallbackFunction} category={this.state.categories}/>
                    </Col>
                   </FormGroup>
                  </Col>
                 
                 </Row>
               </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Сохранить</Button>
              
              </CardFooter>
              </Form>
            
            </Card>
           
          </Col>
        
        
        </Row>
     
 
      </div>
    );
  }
}

export default AddClass;
