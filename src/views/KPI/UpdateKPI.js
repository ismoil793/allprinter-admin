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
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';


class UpdateKPI extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
        amount: "",
        admin_id: "",
        is_import: 0,
        note: "",
        admins: []
    };
    
  }

  componentWillMount() {
    if (this.props.location.kpi_id !== undefined) {
      localStorage.setItem("kpi_id", this.props.location.kpi_id);
    }
  }

  componentDidMount() {
     
    httpGet({
      url: 'api/admin/bonus',
      params: {
         bonus_id: localStorage.getItem('kpi_id')
      }
    })
      .then(response => {
          this.setState({
            amount: response.data.data.amount,
            admin_id:  response.data.data.user ? response.data.data.user.id : null,
            note:  response.data.data.note,
        })
       
      })
      .catch(error => {
        console.log(error);
      });

      httpGet({
        url: 'api/admin/manager',
        params: {
         per_page:200
        }
      })
        .then(response => {
            this.setState({
             admins: response.data.data
          })
         
        })
        .catch(error => {
          console.log(error);
        });
  }



  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  SubmitHandler = (e) => {
    e.preventDefault()
    const notyf = new Notyf()
    let formData = new FormData()
    formData.append('amount', this.state.amount)
    formData.append('admin_id', this.state.admin_id)
    formData.append('note', this.state.note)
    formData.append('is_import', this.state.is_import)
  

    httpPost({
      url: `api/admin/bonus/update/${localStorage.getItem("kpi_id")}`,
      data: formData, 
      headers: {
        'Content-Type': 'multipart/form-data'
      }}
    )
    .then(response => {
      notyf.success('Вы обновили Kpi')
      this.props.history.push("/kpi");  
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
                        <strong>Kpi</strong> 
                     </Col>
                  </Row>
              </CardHeader>

             
              <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                <Row>
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Сумма</Label>
                          <Input
                            type="text"
                            name="amount"
                            placeholder=""
                            value={this.state.amount}
                            onChange={this.changeHandler}
                          />
                       
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Кому?</Label>
                     
                         <Input
                            onChange={this.changeHandler}
                            type="select"
                            name="admin_id"
                            value={this.state.admin_id}
                            id="select"
                          >
                            <option value="">Выберите админа</option>
                            {this.state.admins ? this.state.admins.map(admin => (
                            <option value={admin.id}>{admin.first_name + " " + admin.last_name}</option>
                            )) : null}
                          </Input>
                       
                        </Col>
                      </FormGroup>
                    </Col>

            
                  </Row>
                <hr/>
                  <Row>
                    <Col md="6">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Описание</Label>
                          <Input
                            type="text"
                            name="note"
                            placeholder=""
                            value={this.state.note}
                            onChange={this.changeHandler}
                          />
                       
                        </Col>
                      </FormGroup>
                    </Col>
                 </Row>

                 
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> Сохранить
                  </Button>
                </CardFooter>
              </Form>
             
            </Card>
           
          </Col>
        
        
        </Row>
     
 
      </div>
    );
  }
}

export default UpdateKPI;
