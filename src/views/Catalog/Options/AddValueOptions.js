import React, { Component } from 'react';


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

class AddValueOptions extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
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
              <CardHeader>
                <strong>Значение Характеристик</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
              

                  <FormGroup row>
                  
                    <Col md="3">
                      <Label htmlFor="select">Характеристика</Label>
                    </Col>
                    <Col xs="9" md="9">
                    <Row>
                    <Col md="9">
                      <Input type="select" name="select" id="select">
                          <option value="0">Выберите Характеристику</option>
                          <option value="1">Artel</option>
                          <option value="2">Samsung</option>
                          <option value="3">LG</option>
                          <option value="3">Avtech</option>
                       </Input>
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
                   
                      <Input type="text" id="text-input" name="text-input" placeholder="" />
                      <FormText color="muted">ru</FormText>
                    </Col>
                   </FormGroup>
                  </Col>
                  
                  <Col md="3">
                  <FormGroup row>
                    <Col md="12">
                     
                      <Input type="text" id="text-input" name="text-input" placeholder="" />
                      <FormText color="muted">uz</FormText>
                    </Col>
                   </FormGroup>
                  </Col>
                  

                  <Col md="3"> 
                  <FormGroup row>
                    <Col md="12">
                      <Input type="text" id="text-input" name="text-input" placeholder="" />
                      <FormText color="muted">en</FormText>
                    </Col>
                  </FormGroup>
                  </Col>
                 </Row>
                    </FormGroup>
                  

             

                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Сохранить</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i>Сбросить</Button>
              </CardFooter>
            </Card>
            
          </Col>
         
        </Row>
       
      </div>
    );
  }
}

export default AddValueOptions;
