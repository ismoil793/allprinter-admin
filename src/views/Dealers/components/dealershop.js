import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';



class DealerShops extends Component {

  constructor(props) {
    super(props);
    this.state = {
     
    };
  }


  render() {
   
    return (
      <div className="animated fadeIn">
        <Row>
        
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Заказы
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>  
                    <th>ID</th>
                    <th>Наименование</th>
                    <th>К-во продуктов</th>
                  
                  </tr>
                  </thead>
                  <tbody>
                  {this.props.dealerData.shops ?  
                 this.props.dealerData.shops.map(shop => (
                  <tr>
                    <td>{shop.id}</td>
                    <td>{shop.name}</td>
                    <td>{shop.item_count}</td>
                   
                  </tr> 
                   )) : <p>Пользователь магазинов </p> }
                 
               
                  </tbody>
                </Table>
                {/* <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
</div>

    );
  }
}

export default DealerShops;
