import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from "reactstrap";
import { httpGet } from "../../../api";

class CardAdress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: []
    };
  }

  componentDidMount() {
    httpGet({
      url: "api/admin/address",
        params: {
          user_id: this.props.id
        }
      })
      .then(response => {
     
        this.setState({
          addresses: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const { addresses } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Адреса
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Наименование</th>
                      <th>Адрес</th>
                      <th>Город</th>
                      <th>Регион</th>
                      <th>Телефон</th>
                      {/* <th>Действие</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {addresses ? 
                      addresses.map(address => (
                        <tr>
                          <td>{address.name}</td>
                          <td>{address.address}</td>
                           <td>{address.region.city.name}</td>
                           <td>{address.region.name}</td>
                          <td>{address.phone.replace(/^(\d{3})(\d{2})\s*(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5')}</td>
                          {/* <td>
                            <ActionButton />
                          </td> */}
                        </tr>
                      )) : <p>Пользователь не имеет адресов </p>
                  }
                  </tbody>
                </Table>
                {/* <Pagination>
                  <PaginationItem disabled>
                    <PaginationLink previous tag="button">
                      Prev
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button">
                      Next
                    </PaginationLink>
                  </PaginationItem>
                </Pagination> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CardAdress;
