import React, { Component } from 'react';
import { httpGet, httpPost } from "../../api";

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
  Input,
  Label,
  Row,
} from 'reactstrap';




class AddManagers extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      first_name:'',
      last_name:'',
      password: '',
      email: '',
      role_id: null,
      roles: []
     };
    
  }

  componentDidMount(){
    setTimeout(() => {
      this.getRoles()
    }, 100)
  }
  
  
  getRoles = () => {
    httpGet({
      url: "api/admin/role",
      params:{
        type: "admin"
      }
    })
    .then(response => {
      this.setState({
       roles: response.data.data,
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
    formData.append('first_name', this.state.first_name)
    formData.append('last_name', this.state.last_name)
    formData.append('email', this.state.email)
    formData.append('password', this.state.password)
    formData.append('role_id', this.state.role_id)
   
    e.preventDefault()
    
    httpPost({
      url: 'api/admin/manager/create',
      data: formData, 
      headers: {
          'Content-Type': 'multipart/form-data'
        }}
    )
    .then(response => {
     
      notyf.success('Вы добавили Менеджера')
      this.setState({
        first_name:'',
      last_name:'',
      password: '',
      email: '',
      role_id: null,
       
      })
    })
    .catch(error =>{
      console.log(error)
      this.setState({
        first_name:'',
        last_name:'',
        password: '',
        email: '',
        role_id: null,
      })
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
                        <strong>Менеджера</strong> 
                     </Col>
                  </Row>
              </CardHeader>

             
                <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                 <Row>
                   <Col md="6"> 
                   <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Email</Label>
                      <Input
                      type="email" 
                      name="email" placeholder="" 
                      value={this.state.email}  
                      onChange={this.changeHandler}/>
               
                    </Col>
                   </FormGroup>
                  </Col>

                  <Col md="6"> 
                   <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Пароль</Label>
                      <Input
                      type="text" 
                      name="password" placeholder="" 
                      value={this.state.password}  
                      onChange={this.changeHandler}/>
       
                    </Col>
                   </FormGroup>
                  </Col>


                  <Col md="6"> 
                   <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Имя</Label>
                      <Input
                      type="text" 
                      name="first_name" placeholder="" 
                      value={this.state.first_name}  
                      onChange={this.changeHandler}/>
                
                    </Col>
                   </FormGroup>
                  </Col>

                 <Col md="6"> 
                   <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Фамилия</Label>
                      <Input
                      type="text" 
                      name="last_name" placeholder="" 
                      value={this.state.last_name}   
                      onChange={this.changeHandler}/>
                   
                    </Col>
                   </FormGroup>
                  </Col>

                  <Col md="12"> 
                   <FormGroup row>
                   <Col md="12">
                      <Label htmlFor="text-input">Роль</Label>
                  <Input onChange={this.changeHandler} type="select" name="role_id" value={this.state.role_id} id="select">
                        <option value="">Выберите роль пользователя</option>
                        {this.state.roles ? this.state.roles.map(role => (
                        <option value={role.id}>{role.name}</option>
                        )):null }
                       
                      </Input>
                     
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

export default AddManagers;
