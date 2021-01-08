import React, { Component } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Badge,
  Table,
} from 'reactstrap';
import { httpGet } from "../../../api";
import {Link} from 'react-router-dom'

class CardOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      order: []
    };
  }

  componentDidMount(){
    httpGet({
      url: "api/admin/order",
      params: {
       user_id: this.props.id
      }
    })
    .then(response => { 
      this.setState({
      order: response.data.data
     })
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const {order} = this.state;

    return (
      <div className="animated fadeIn">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Заказы
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>  
                    <th>ID</th>
                    <th>Телефон</th>
                    <th>Дата</th>
                    <th>Дата доставки</th>
                    <th>Сумма</th>
                    <th>Доставка</th>
                    <th>Вид оплаты</th>
                    <th>Статус</th>
                  </tr>
                  </thead>
                  <tbody>
                  {order ?  
                  order.map(order => (
                  <tr>
                    <Link to={{pathname: `/orderpage/${order.id}`, order_id: order.id}}>  <td>{order.id}</td>  </Link>
                    <td>{order.user_phone.replace(/^(\d{3})(\d{2})\s*(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5')}</td>
                    <td>{order.created_at}</td>
                    <td>
                      {order.delivered_at
                        ? order.delivered_at
                        : "не доставлен"}
                    </td>
                    <td>
                      {order.total
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                      сум
                    </td>
                    <td>{order.delivery.name}</td>
                    <td>{order.payment.name}</td>
                    {order.state.name === "Открыт" ? (
                      <td>
                        <Badge color="warning">
                          {order.state.name}
                        </Badge>
                      </td>
                    ) : order.state.name === "Отменен" ? (
                      <td>
                        <Badge color="danger">{order.state.name}</Badge>
                      </td>
                    ) : order.state.name === "Доставлен" ? (
                      <td>
                        <Badge color="success">
                          {order.state.name}
                        </Badge>
                      </td>
                    ) : order.state.name === "В пути" ? (
                      <td>
                        <Badge color="secondary">
                          {order.state.name}
                        </Badge>
                      </td>
                    ) : (
                      <td>
                        <Badge color="primary">
                          {order.state.name}
                        </Badge>
                      </td>
                    )}
                  </tr> 
                   )) : <p>Пользователь не имеет заказов </p> }
                 
               
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
      </div>
    );
  }
}

export default CardOrder;
