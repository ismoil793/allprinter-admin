import React, { Component } from 'react';
import { httpGet } from "../../../api";
import {
  Badge,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Label,
  Row,
} from 'reactstrap';

const getBadge = status => {
    return status === 1 ? "success" : "danger";
  };

class CourierInfo extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      courier: [],
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  componentDidMount(){
    httpGet({ 
      url: "api/admin/carrier",
      params: {
       carrier_id: this.props.id
      }
    })
    .then(response => { 
      this.setState({
      courier: response.data.data
     })
    })
    .catch(error => {
      console.log(error);
    });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    const {courier} = this.state
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
                    <Label htmlFor="select">{courier.first_name}</Label>
                    </Col>
                    
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select"><b>Фамилия:</b> </Label>
                    </Col>
                   
                    <Col xs="12" md="4">
                    <Label htmlFor="select">{courier.last_name}</Label>
                    </Col>
                    
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select"><b>Телефон:</b> </Label>
                    </Col>
                   
                    <Col xs="12" md="4">
                    <Label htmlFor="select">+{courier.username}</Label>
                    </Col>
                    
                  </FormGroup>
                

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select"><b>Последнее обновление:</b> </Label>
                    </Col>
                   
                    <Col xs="12" md="4">
                    <Label htmlFor="select">{courier.logged_at}</Label>
                    </Col>
                    
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select"><b>Статус:</b> </Label>
                    </Col>
                   
                    <Col xs="12" md="4">
                    

                    {courier.status === 1 ? (
                         <Label htmlFor="select"><Badge color={getBadge(courier.status)}>
                         Активный
                       </Badge></Label>
                                    ) : (
                              <td>
                                <Label htmlFor="select"><Badge color={getBadge(courier.status)}>
                         не активный
                       </Badge></Label>
                              </td>
                            )}
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

export default CourierInfo;
