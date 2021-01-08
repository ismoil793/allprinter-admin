import React, { Component } from 'react';
import { httpGet } from "../../api";

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

import { getOneManager, updateManager } from "./api";
import ManagerSuggest from './ManagerSuggest';

class UpdateManager extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      first_name:'',
      last_name:'',
      email: '',
      role_id: null,
      roles: [],
      sale_points: [],
      sale_id:'',
      sale_name: '',
      bonus: ''
     };
    
  }



  componentDidMount(){
    this.getOneManagerData(this.props.match.params.id)
    this.getSalePoints()
    setTimeout(() => {
      this.getRoles()
    }, 100)
  }

  getSalePoints = () => {
    httpGet({
      url: "api/admin/stock/parent"
    })
    .then(response => {
      this.setState({
       sale_points: response.data.data,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  
SaleCallbackFunction = (childData) => {
    this.setState({sale_id: childData})
}


  getOneManagerData = (id) => {
    getOneManager(id)
      .then(response => {
        this.setState({
          id: this.props.match.params.id,
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
          email: response.data.data.email,
          role_id: response.data.data.roles[0].id,
          sale_id:response.data.data.stock_parent ? response.data.data.stock_parent.id : null,
          sale_name: response.data.data.stock_parent ? response.data.data.stock_parent.name : null,
          bonus: response.data.data.bonus
         });
      })
      .catch(error => {
        console.log(error);
      });
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


    
  changeHandler = (e) =>{
    this.setState({[e.target.name]: e.target.value })
  }


  SubmitHandler = (e) => {
     e.preventDefault();
    const notyf = new Notyf();
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      role_id: this.state.role_id,
      stock_parent_id: this.state.sale_id
    };
    
    updateManager(this.state.id, data)
      .then(response => {
        notyf.success('Менеджер обновлен')
        this.props.history.push('/userroles/managers/')
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
                    <strong>Менеджер</strong> 
                  </Col>
                </Row>
              </CardHeader>
              <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                 <Row>
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
                      <Label htmlFor="text-input">Баланс</Label>
                      <Input
                      readOnly
                      type="text" 
                      name="bonus" placeholder="" 
                      value={this.state.bonus}  
                      onChange={this.changeHandler}/>
                    </Col>
                   </FormGroup>
                  </Col>

                  <Col md="6"> 
                   <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Привязать торговые точки</Label>
                    <ManagerSuggest categoryFunction={this.SaleCallbackFunction} category={this.state.sale_points} selected={this.state.sale_name}/>
                    </Col>
                   </FormGroup>
                  </Col>
                  <Col md="12"> 
                   <FormGroup row>
                    <Col md="12">
                        <Label htmlFor="text-input">Роль</Label>
                        <Input onChange={this.changeHandler} type="select" name="role_id" value={this.state.role_id} id="select">
                          {/* <option value="0">Статусы</option> */}
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

export default UpdateManager;
