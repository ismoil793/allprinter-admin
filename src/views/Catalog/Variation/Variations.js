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

class Variations extends Component {
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
              <CardHeader><Row> <Col xs="12" md="2">
              <strong>Характеристики</strong> 
              </Col>
              <Col md="9"></Col>
                <Col xs="12" md="1">
                   <Input type="select" name="select" id="select">
                       <option value="1">ru</option>
                        <option value="2">en</option>
                        <option value="3">uz</option>
                      </Input>
                  </Col>
                </Row>
               
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                 
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Название Характеристики</Label>
                      <Input type="text" id="text-input" name="text-input" placeholder="" />
                    </Col>
                    <Col xs="12" md="9">
                    <Label htmlFor="text-input">Значение</Label>
                      <Input type="text" id="text-input" name="text-input" placeholder="" />
                      <FormText color="muted">This is a help text</FormText>
                    </Col>
                  
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Название Характеристики</Label>
                      <Input type="text" id="text-input" name="text-input" placeholder="" />
                    </Col>
                    <Col xs="12" md="9">
                    <Label htmlFor="text-input">Значение</Label>
                      <Input type="text" id="text-input" name="text-input" placeholder="" />
                      <FormText color="muted">This is a help text</FormText>
                    </Col>
                   
                  </FormGroup>


                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Название Характеристики</Label>
                      <Input type="text" id="text-input" name="text-input" placeholder="" />
                    </Col>
                    <Col xs="12" md="9">
                    <Label htmlFor="text-input">Значение</Label>
                      <Input type="text" id="text-input" name="text-input" placeholder="" />
                      <FormText color="muted">This is a help text</FormText>
                    </Col>
               
                  </FormGroup>


                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Название Характеристики</Label>
                      <Input type="text" id="text-input" name="text-input" placeholder="" />
                    </Col>
                    <Col xs="12" md="9">
                    <Label htmlFor="text-input">Значение</Label>
                      <Input type="text" id="text-input" name="text-input" placeholder="" />
                      <FormText color="muted">This is a help text</FormText>
                    </Col>
                  </FormGroup>


                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Название Характеристики</Label>
                      <Input type="text" id="text-input" name="text-input" placeholder="" />
                    </Col>
                    <Col xs="12" md="9">
                    <Label htmlFor="text-input">Значение</Label>
                      <Input type="text" id="text-input" name="text-input" placeholder="" />
                      <FormText color="muted">This is a help text</FormText>
                    </Col>
                   
                  </FormGroup>


                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Название Характеристики</Label>
                      <Input type="text" id="text-input" name="text-input" placeholder="" />
                    </Col>
                    <Col xs="12" md="9">
                    <Label htmlFor="text-input">Значение</Label>
                      <Input type="text" id="text-input" name="text-input" placeholder="" />
                      <FormText color="muted">This is a help text</FormText>
                    </Col>
               
                    
                  </FormGroup>

                 
                
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Сохранить</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Сбросить</Button>
              </CardFooter>
            </Card>
           
          </Col>
        
        
        </Row>
     
 
      </div>
    );
  }
}

export default Variations;
