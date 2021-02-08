import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { httpGet } from "../../../api";
import { Link } from 'react-router-dom'

class CourierOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      order: [],
      first: 0,
      last: 10,
      meta: {
        current_page: null,
        last_page: null,
        per_page: 10
      }
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.getOrder()
    }, 100)
  }

  getOrder = e => {
    httpGet({
      url: "api/admin/order",
      params: {
        carrier_id: this.props.id
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

  Pagination = e => {
    const meta = this.state.meta;
    meta.current_page = e;

    this.setState({ meta: meta });

    this.getOrder();
  };

  createPaging = () => {
    let paging = [];


    for (let i = 1; i <= this.state.meta.last_page; i++) {
      paging.push(
        <PaginationItem key={i} onClick={() => this.Pagination(i)}>
          <PaginationLink tag="button">{i}</PaginationLink>
        </PaginationItem>
      );
    }
    let newPaging = paging.length > 35 || window.innerWidth < 1680 ? paging.slice(this.state.first, this.state.last) : paging
    return newPaging
  };

  IncrementPage = e => {
    e.preventDefault();
    const meta = this.state.meta;

    if (meta.current_page < meta.last_page) {
      meta.current_page = meta.current_page + 1;
      this.setState({
        meta: meta,
        first: this.state.first + 10,
        last: this.state.last + 10
      });
    } else {
      this.setState({
        meta: meta
      });
    }

    this.getOrder();
  };

  DecrementPage = e => {
    const meta = this.state.meta;

    e.preventDefault();
    if (meta.current_page > 1) {
      meta.current_page = meta.current_page - 1;
      if (this.state.first >= 0) {
        this.setState({
          meta: meta,
          first: this.state.first - 10,
          last: this.state.last - 10
        });
      }

    } else {
      this.setState({ meta: meta });
    }

    this.getOrder();
  };



  render() {
    const { order } = this.state
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
                      <th>Дата</th>
                      <th>Вид доставки</th>
                      <th>Вид оплаты</th>
                      <th>Итого</th>
                      <th>Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order ?
                      order.map(order => (

                        <tr>
                          <Link to={{ pathname: `/orderpage/${order.id}`, order_id: order.id }}>  <td>{order.id}</td>  </Link>
                          <td>{order.created_at}</td>
                          <td>{order.delivery.name}</td>
                          <td>{order.payment.name}</td>
                          <td>{order.total} сум</td>
                          <td>{order.state.name}</td>
                        </tr>

                      )) : <p>Пользователь не имеет заказов </p>}


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

export default CourierOrder;
