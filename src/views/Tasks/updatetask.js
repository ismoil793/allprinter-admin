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



class UpdateTasks extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: '',
      until: '',
      carriers:[],
      carrierID:''
     
    };
    
  }

  componentWillMount() {
    if (this.props.location.task_id !== undefined) {
      localStorage.setItem("task_id", this.props.location.task_id);
    }
  }

  componentDidMount() {
    httpGet({
      url: 'api/admin/task',
      params: {
         task_id:localStorage.getItem("task_id")
        }
    })
      .then(response => {
        this.setState({
            name: response.data.data.name, 
            description: response.data.data.description ? response.data.data.description : null,
            until: response.data.data.until,
            carrierID: response.data.data.carrier.id,
        })
       
      })
      .catch(error => {
        console.log(error);
      });

      this.getCarrier()
  }

  getCarrier = () => {
    httpGet({
      url: "/api/admin/carrier",
      params: {
        per_page: 1000
      }
    })
    .then(response => {
      this.setState({
        carriers: response.data.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value })
  }


  SubmitHandler = (e) => {
    const notyf = new Notyf()
    let formData = new FormData()
    formData.append('name', this.state.name)
    formData.append('description', this.state.description)
    
    if(this.state.until){
     formData.append('until', this.state.until)
    }

    

   
    e.preventDefault()

    httpPost({
      url: `api/admin/task/update/${localStorage.getItem("task_id")}`,
      data: formData, 
      headers: {
        'Content-Type': 'multipart/form-data'
      }}
    )
    .then(response => {
     
      notyf.success('Вы обновили задачу')
    })
    .catch(error =>{
      console.log(error)
    })
    
  }

  render() {
    let today = new Date();

let date=today.getFullYear()+parseInt(today.getMonth()+1)+today.getDate() ;

console.log(date)

    return (
      <div className="animated fadeIn">
      <Row>
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <Row>
                <Col xs="12" md="2">
                  <strong>Добавить задачу</strong>
                </Col>
              </Row>
            </CardHeader>

            <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
              <CardBody>
                <Row>
                  <Col md="6">
                    <FormGroup row>
                      <Col md="12">
                        <Label htmlFor="text-input">Название задачи</Label>
                        <Input
                          type="text"
                          name="name"
                          placeholder=""
                          value={this.state.name}
                          onChange={this.changeHandler}
                        />
                        <FormText color="muted"></FormText>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup row>
                      <Col md="12">
                        <Label htmlFor="text-input">
                         Описание задачи
                        </Label>
                        <Input
                          type="text"
                          name="description"
                          placeholder=""
                          value={this.state.description}
                          onChange={this.changeHandler}
                        />
                        <FormText color="muted"></FormText>
                      </Col>
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup row>
                      <Col md="12">
                        <Label htmlFor="text-input">
                        До 
                        </Label>
                        <Input
                        type="date"
                        id="text-input"
                        name="until"
                        value={this.state.until}
                        onChange={this.changeHandler}
                        placeholder=""
                      />
                        <FormText color="muted"></FormText>
                      </Col>
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup row>
                      <Col md="12">
                        <Label htmlFor="text-input">
                        Выбрать курьера
                        </Label>
                        <Input type="select" name="carrierID" value={this.state.carrierID}  onChange={this.changeHandler} id="select">
                        <option value="">Выберите курьера</option>
                        {this.state.carriers ?  this.state.carriers.map(carrier => (
                          <option value={carrier.id}>{carrier.first_name + " " + carrier.last_name}</option>
                       )) : null}
                    
                      </Input>
                        <FormText color="muted"></FormText>
                      </Col>
                    </FormGroup>
                  </Col>

                  {/* <Col md="6">
                    <FormGroup row>
                      <Col md="12">
                        <Label htmlFor="file-input">
                          Добавить изображение:
                        </Label>
                        <Input
                          type="file"
                          id="file-input"
                          onChange={this.changeImageHandler}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                 { this.state.image_file ? (
                     <Col md="6">
                     <FormGroup row>
                       <Col md="12">
                       
                        <img style={{width:'50%'}} src={this.state.image_file ? this.state.image_file : null} alt="Бренд" />
                       </Col>
                     </FormGroup>
                   </Col>
                 ) : null } */}
                
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

export default UpdateTasks;
