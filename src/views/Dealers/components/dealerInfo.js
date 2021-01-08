import React, { Component } from 'react';

import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Label,
  Row,
} from 'reactstrap';

class DealerInfo extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      user: this.props.dealerData,
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

 

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    
    return (
      <div className="animated fadeIn">
       
        <Row>
          <Col xs="12" md="12">
            <Card>
              {/* <CardHeader>
                <strong>Главная 
                    Информация</strong> 
              </CardHeader> */}
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  
                <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select"><b>Имя:</b> </Label>
                    </Col>
                   
                    <Col xs="12" md="4">
                    <Label htmlFor="select">{this.props.dealerData.first_name}</Label>
                    </Col>
                    
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select"><b>Фамилия:</b> </Label>
                    </Col>
                   
                    <Col xs="12" md="4">
                    <Label htmlFor="select">{this.props.dealerData.last_name}</Label>
                    </Col>
                    
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select"><b>Телефон:</b> </Label>
                    </Col>
                   
                    <Col xs="12" md="4">
                    <Label htmlFor="select">{this.props.dealerData.phone}</Label>
                    </Col>
                    
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select"><b>Дата регистрации:</b></Label>
                    </Col>
                   
                    <Col xs="12" md="4">
                    <Label htmlFor="select"> {this.props.dealerData.created_at}</Label>
                    </Col>
                    
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select"><b>Последнее обновление:</b> </Label>
                    </Col>
                   
                    <Col xs="12" md="4">
                    <Label htmlFor="select"> {this.props.dealerData.logged_at}</Label>
                    </Col>
                    
                  </FormGroup>
                
               

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select"><b>Email:</b></Label>
                    </Col>
                   
                    <Col xs="12" md="4">
                    <Label htmlFor="select">{this.props.dealerData.email}</Label>
                    </Col>
                    
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select"><b>Долг:</b> </Label>
                    </Col>
                   
                    <Col xs="12" md="4">
                    <Label htmlFor="select">{Number(this.props.dealerData.debt_price).toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум</Label>
                    </Col>
                    
                  </FormGroup>

                  
              </Form>
              </CardBody>
             
            </Card>
            
          </Col>
         
        </Row>
       
       
      
      </div>
    );
  }
}

export default DealerInfo;
