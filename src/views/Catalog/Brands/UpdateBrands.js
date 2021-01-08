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



class UpdateBrands extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      name: '', 
      image: null,
      product_count: null,
      reference: '',
      id:null,
      image_file: null,
      file: null,
      alif: ''
      
    };
    
  }

  componentWillMount() {
    if (this.props.location.brand_id !== undefined) {
      localStorage.setItem("brand_id", this.props.location.brand_id);
    }
  }

  componentDidMount() {
    httpGet({
      url: 'api/admin/brand',
      params: {
         brand_id: localStorage.getItem("brand_id")
        }
    })
      .then(response => {
  
        this.setState({
            name: response.data.data.name, 
            image: response.data.data.image ? response.data.data.image : null,
            reference: response.data.data.reference,
            alif: response.data.data.alif,
            product_count: response.data.data.product_count,
            id:response.data.data.id
        })
       
      })
      .catch(error => {
        console.log(error);
      });
  }

  changeImageHandler = (e) => {
    this.setState({
      image_file: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
      image: null
    })

  }  

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value })
  }


  SubmitHandler = (e) => {
    const notyf = new Notyf()
    let formData = new FormData()
    formData.append('name', this.state.name)
    formData.append('reference', this.state.reference)
    formData.append("alif", this.state.alif);
    if(this.state.file){
     formData.append('image', this.state.file)
    }

    

   
    e.preventDefault()

    httpPost({
      url: `api/admin/brand/update/${this.props.location.brand_id}`,
      data: formData, 
      headers: {
        'Content-Type': 'multipart/form-data'
      }}
    )
    .then(response => {
     
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
                        <strong>Бренды</strong> 
                     </Col>
                  </Row>
              </CardHeader>

             
                <Form className="form-horizontal" onSubmit={this.SubmitHandler}>
                <CardBody>
                 <Row>
                   <Col md="6"> 
                   <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Название Бренда</Label>
                      <Input
                      type="text" 
                      name="name" placeholder="" 
                      value={this.state.name}  
                      onChange={this.changeHandler}/>
                      <FormText color="muted"></FormText>
                    </Col>
                   </FormGroup>
                  </Col>

                  
                  <Row>
                    <Col md="12">
                      <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="text-input">Alifshop ID</Label>
                       
                          <Input
                            type="text"
                            id="text-input"
                            name="alif"
                            placeholder=""
                            value={this.state.alif}
                            onChange={this.changeHandler}
                          />
                        
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Col md="6"> 
                   <FormGroup row>
                    <Col md="12">
                      <Label htmlFor="text-input">Сокращенное название</Label>
                      <Input
                      type="text" 
                      name="reference" placeholder="" 
                      value={this.state.reference}  
                      onChange={this.changeHandler}/>
                      <FormText color="muted"></FormText>
                    </Col>
                   </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup row>
                        <Col md="12">
                          <Label htmlFor="file-input">Добавить изображение:</Label>
                          <Input type="file" id="file-input" onChange={this.changeImageHandler}/>
                       </Col>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                    <FormGroup row>
                        <Col md="12">
                        
                        <img style={{width: "50%"}}src={this.state.image ? this.state.image : this.state.image_file } alt="привет" /> 
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

export default UpdateBrands;
