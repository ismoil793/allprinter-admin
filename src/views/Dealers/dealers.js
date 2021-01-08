import React, { Component } from "react";
import { Link } from "react-router-dom"

import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Col,
  Row,
  Table,
  Pagination,
  Label,
  Input,
  FormGroup,
   Form
} from "reactstrap";
import { PaginationLink, PaginationItem } from "reactstrap";
import { httpGet } from "../../api";

import DealerBtn from "./components/Dealerbutton";

// function dealerRow(props) {
//   const dealer = props.dealer;
//   const dealerLink = `/icons/${dealer.id}`;

//   const getBadge = status => {
//     return status === "Активный"
//       ? "success"
//       : status === "Заблокирован"
//       ? "danger"
//       : "primary";
//   };

//   return (
//     <tr key={dealer.id.toString()}>
//       <th scope="row">
//         <Link to={dealerLink}>{dealer.id}</Link>
//       </th>
//       <td>
//         <Link to={dealerLink}>{dealer.name}</Link>
//       </td>
//       <td>{dealer.registered}</td>
//       <td>{dealer.role}</td>
//       <td>
//         <Link to={dealerLink}>
//           <Badge color={getBadge(dealer.status)}>{dealer.status}</Badge>
//         </Link>
//       </td>
//       <td>
//         <dealerBtn />
//       </td>
//     </tr>
//   );
// }

// const getBadge = status => {
//   return status === 2
//     ? "success"
//     : status === 3
//     ? "danger"
//     : "primary";
// };

class DealersList extends Component {
        constructor() {
          super()
          this.state = {
            dealers: [],
            search: '',
            stateID: null,
            meta: {
              current_page: null,
              last_page: null,
              per_page: 10
            }
          }
        }

  
        componentDidMount(){
          setTimeout(() => {
            this.getDealer();
          }, 10);
        }
      
        getDealer = () => {
          httpGet({ 
            url: "api/admin/dealer",
            params: {
              search: this.state.search,
              status: this.state.stateID,
              all: 1,
              page: this.state.meta.current_page,
              per_page: this.state.meta.per_page,
            
            }
          })
          .then(response => { 
            this.setState({
             dealers: response.data.data,
            meta: {
              current_page: response.data.meta.current_page,
              last_page: response.data.meta.last_page,
              per_page: response.data.meta.per_page
            }
          })})
          .catch(error => {
            console.log(error);
          });
      
         
        }
      
      
        Pagination = e => {
          const meta = this.state.meta;
          meta.current_page = e;
      
          this.setState({ meta: meta });
      
          this.getDealer();
        };
        createPaging = () => {
          let paging = [];
      
          for (let i = 1; i <= this.state.meta.last_page; i++) {
            if(this.state.meta.current_page === i){
              paging.push(
                <PaginationItem active key={i} onClick={() => this.Pagination(i)}>
                  <PaginationLink tag="button">{i}</PaginationLink>
                </PaginationItem>
              )
            }else{
              paging.push(
                <PaginationItem key={i} onClick={() => this.Pagination(i)}>
                  <PaginationLink tag="button">{i}</PaginationLink>
                </PaginationItem>
              )
            }
      
            }
          
            return paging.slice(this.state.first, this.state.last);
        };
      
        IncrementPage = e => {
          e.preventDefault();
          const meta = this.state.meta;
      
          if (meta.current_page < meta.last_page) {
            meta.current_page = meta.current_page + 1;
            this.setState({ meta: meta });
          } else {
            this.setState({ meta: meta });
          }
      
          this.getDealer();
        };
      
        DecrementPage = e => {
          const meta = this.state.meta;
      
          e.preventDefault();
          if (meta.current_page > 1) {
            meta.current_page = meta.current_page - 1;
            this.setState({ meta: meta });
          } else {
            this.setState({ meta: meta });
          }
      
          this.getDealer();
        };

        handleChange = e => {
          
          e.preventDefault()
          this.setState({ [e.target.name]: e.target.value }, () => {
            setTimeout(() => {
            this.getDealer();
          }, 100);
          });
        };
        
        Reset = () => {
          this.setState({  
            search: '',
            stateID: null
          });
        }
         


  render() {
  const {dealers} = this.state

    return (
      <div className="animated fadeIn">
        <Row>
         <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <strong>Фильтры</strong>
              </CardHeader>
              <CardBody>
                <Form
                  action=""
                  method="post"
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <Row>
                    <FormGroup column>
                      <Col md="12">
                        <Label htmlFor="text-input">Поиск</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input
                          type="text"
                          id="text-input"
                          name="search"
                          value={this.state.search}
                          placeholder=""
                          onChange={this.handleChange}
                        />
                      </Col>
                    </FormGroup>
                    
                    {/* <FormGroup column>
                      <Col md="3">
                        <Label htmlFor="text-input">Статус</Label>
                      </Col>
                      <Col xs="12" md="12">
                        <Input type="select" name="stateID" value={this.state.stateID}  onChange={this.handleChange} id="select">
                        <option value="">Выберите статус</option>
                          <option value="2">Да</option>
                          <option value="3">Нет</option>
                        </Input>
                      </Col>
                    </FormGroup> */}

                  
                  </Row>
                </Form>
              </CardBody>
             
            </Card>
          </Col>

          <Col xl={12}>
            <Card>
              <CardHeader>
                <div className="row d-flex align-items-center justify-content-between">
                  <div className="col-auto">
                    <i className="fa fa-align-justify"></i> Пользователи{" "}
                    <small className="text-muted">MarketPlace</small>
                  </div>
                  <div className="col-auto">
                    <Link to='/suppliers/dealers/add'>
                      <Button className="fa fa-plus" color="primary">
                        <span className="ml-1">Добавить</span>
                      </Button>
                    </Link>
                  </div> 
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">ФИО</th>
                      <th scope="col">Зарегистрировался</th>
                      <th scope="col">Email</th>
                      <th scope="col">Телефонный номер</th>
                      {/* <th scope="col">Статус</th> */}
                      <th scope="col">Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                {dealers ? dealers.map(dealer => (
                  <tr key={dealer.id}>
                    <th scope="row">
                     {dealer.id}
                    </th>
                   
                    <td>
                      {dealer.first_name} {dealer.last_name}
                    </td>
                    <td>{dealer.created_at}</td>
                    <td>{dealer.email}</td>
                    <td>{dealer.phone.replace(/^(\d{3})(\d{2})\s*(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5')}</td>
                    {/* {dealer.status === 2  ?
                    (
                      <td>
                      <Link to={`/icons/${dealer.id}`}>
                        <Badge color={getBadge(dealer.status)}>Зарегистрирован</Badge>
                      </Link>
                    </td>
                    ) : 
                    (
                      <td>
                      <Link to={`/icons/${dealer.id}`}>
                        <Badge color={getBadge(dealer.status)}>Не  Зарегистрирован</Badge>
                      </Link>
                    </td>
                    )  */}
                    
                  
                    
                    <td>
                      <DealerBtn function={this.getDealer} id={dealer.id} />
                    </td>
                  </tr>
                  )): null}
                  </tbody>
                </Table>

                <Pagination>
                  <PaginationItem onClick={this.DecrementPage}>
                    <PaginationLink previous tag="button">
                      Пред
                    </PaginationLink>
                  </PaginationItem>

                  {this.createPaging()}

                  <PaginationItem onClick={this.IncrementPage}>
                    <PaginationLink next tag="button">
                      След
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DealersList;
