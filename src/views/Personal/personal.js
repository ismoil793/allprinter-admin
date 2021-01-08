import React, { Component, lazy } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom'
import { httpGet } from "../../api";


import {
    Label,
    FormGroup,
    Form,
    PaginationItem,
    Pagination,
    PaginationLink,
    Card,
    CardBody,
    CardHeader,
    Col,
    Progress,
    Row,
    Table,
    Badge,

} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities'
const Widget04 = lazy(() => import('../../views/Widgets/Widget04'));



const brandPrimary = getStyle('--primary')
const brandInfo = getStyle('--info')


// Card Chart 1
const cardChartData1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: brandPrimary,
            borderColor: 'rgba(255,255,255,.55)',
            data: [65, 59, 84, 84, 51, 55, 40],
        },
    ],
};



// Card Chart 2
const cardChartData2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: brandInfo,
            borderColor: 'rgba(255,255,255,.55)',
            data: [1, 18, 9, 17, 34, 22, 11],
        },
    ],
};

const cardChartOpts2 = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent',
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                },

            }],
        yAxes: [
            {
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
                    max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
                },
            }],
    },
    elements: {
        line: {
            tension: 0.00001,
            borderWidth: 1,
        },
        point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4,
        },
    },
};

// Card Chart 3
const cardChartData3 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,255,255,.2)',
            borderColor: 'rgba(255,255,255,.55)',
            data: [78, 81, 80, 45, 34, 12, 40],
        },
    ],
};

const cardChartOpts3 = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                display: false,
            }],
        yAxes: [
            {
                display: false,
            }],
    },
    elements: {
        line: {
            borderWidth: 2,
        },
        point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
        },
    },
};

// Card Chart 4
const cardChartData4 = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,255,255,.3)',
            borderColor: 'transparent',
            data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
        },
    ],
};

const cardChartOpts4 = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                display: false,
                barPercentage: 0.6,
            }],
        yAxes: [
            {
                display: false,
            }],
    },
};
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
    data1.push(random(50, 200));
    data2.push(random(80, 100));
    data3.push(65);
}


class Personal extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

        this.state = {
            dropdownOpen: false,
            radioSelected: 2,
            dashboard: {},
            user: {},
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

    getOrders = () => {
        httpGet({
            url: `api/admin/order`,
            params: {
                admin_id: this.state.user.id,
                // order_state_id: 5,
                start_date: "2020-11-1",
                page: this.state.meta.current_page,
                per_page: this.state.meta.per_page,
            }
        })
            .then(response => {
                this.setState({
                    order: response.data.data,
                    meta: {
                        current_page: response.data.meta.current_page,
                        last_page: response.data.meta.last_page,
                        per_page: response.data.meta.per_page,
                    }
                })
            });
    }

    getDashboard = () => {
        httpGet({
            url: `api/admin/order/dashboard`,
            params: {
                admin_id: this.state.user.id,
                order_state_id: 5,
                start_date: "2020-11-20"
            }
        })
            .then(response => {
                this.setState({
                    dashboard: response.data
                })
            });
    };

    componentDidMount() {

        httpGet({ url: `api/admin/manager/user?type=root` })
            .then(response => {
                this.setState({
                    user: response.data.data
                }, () => {
                 this.getOrders()
                 this.getDashboard()
                })
            });

    }

    Pagination = e => {
        const meta = this.state.meta;
        meta.current_page = e;
        this.setState({ meta: meta });
        this.getOrders();
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
          this.setState({ 
            meta: meta,
            first: this.state.first + 10,
            last: this.state.last + 10
          });
        } else {
          this.setState({ meta: meta });
        }
    
        this.getOrders();
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
    
        this.getOrders();
      };
    

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    onRadioBtnClick(radioSelected) {
        this.setState({
            radioSelected: radioSelected,
        });
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
        console.log(this.state.meta)
        return (
            <div className="animated fadeIn">



                <Row>
                    <Col lg="6">
                        <div className="animated fadeIn">

                            <Row>
                                <Col xs="12" md="12">
                                    <Card>
                                        <CardHeader>
                                            <strong>Информация</strong>
                                        </CardHeader>
                                        <CardBody>
                                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                                <FormGroup row>
                                                    <Col md="3">
                                                        <Label htmlFor="select"><b>Имя:</b> </Label>
                                                    </Col>

                                                    <Col xs="12" md="4">
                                                        <Label htmlFor="select">{this.state.user.first_name}</Label>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md="3">
                                                        <Label htmlFor="select"><b>Фамилия:</b> </Label>
                                                    </Col>

                                                    <Col xs="12" md="4">
                                                        <Label htmlFor="select">{this.state.user.last_name}</Label>
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Col md="3">
                                                        <Label htmlFor="select"><b>Логин:</b></Label>
                                                    </Col>

                                                    <Col xs="12" md="4">
                                                        <Label htmlFor="select">{this.state.user.email}</Label>
                                                    </Col>
                                                </FormGroup>

                                    
                                                <FormGroup row>
                                                    <Col md="3">
                                                        <Label htmlFor="select"><b>Последняя активность:</b> </Label>
                                                    </Col>

                                                    <Col xs="12" md="4">
                                                        <Label htmlFor="select">{this.state.user.logged_at}</Label>
                                                    </Col>

                                                </FormGroup>



                                                <FormGroup row>
                                                    <Col md="3">
                                                        <Label htmlFor="select"><b>Роль пользователя:</b></Label>
                                                    </Col>

                                                    <Col xs="12" md="4">
                                                        <Label htmlFor="select">{this.state.user.roles ? this.state.user.roles[0].name : null}</Label>
                                                    </Col>

                                                </FormGroup>




                                            </Form>
                                        </CardBody>

                                    </Card>

                                </Col>

                            </Row>



                        </div>
                    </Col>
                    {this.state.user.roles && this.state.user.roles[0].name === "superadmin" || this.state.user.roles && this.state.user.roles[0].name === "Sales-manager" ? (
                     <Col lg="6" xs="12" sm="6">
                        <Row>
                            <Col xs="12" sm="6" lg="6">
                                <Card className="text-white bg-info">
                                    <CardBody className="pb-0">
                                        <div className="text-value">{Number(this.state.dashboard.total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</div>
                                        <div>Сумма обработанных заказов:</div>
                                    </CardBody>
                                    <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                                        <Line data={cardChartData2} options={cardChartOpts2} height={70} />
                                    </div>
                                </Card>
                            </Col>



                            <Col xs="12" sm="6" lg="6">
                                <Card className="text-white bg-warning">
                                    <CardBody className="pb-0">
                                        <div className="text-value">{Number(this.state.dashboard.bonus).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</div>
                                        <div>Бонусов на счету</div>
                                    </CardBody>
                                    <div className="chart-wrapper" style={{ height: '70px' }}>
                                        <Line data={cardChartData3} options={cardChartOpts3} height={70} />
                                    </div>
                                </Card>
                            </Col>

                            <Col xs="12" sm="6" lg="6">

                            </Col>

                            <Col xs="12" sm="6" lg="6">
                                <Card className="text-white bg-danger">
                                    <CardBody className="pb-0">
                                        <div className="text-value">{Number(this.state.dashboard.withdrawn_funds).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</div>
                                        <div>Выведено средств</div>
                                    </CardBody>
                                    <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                                        <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                     ) :  null}
              </Row>

                    {this.state.user.roles && this.state.user.roles[0].name === "superadmin" || this.state.user.roles && this.state.user.roles[0].name === "Sales-manager" ? (
                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader>Мои заказы</CardHeader>
                                    <CardBody>
                                        <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th >ID</th>
                                                    <th>Телефон</th>
                                                    <th>Дата</th>
                                                    <th>Дата доставки</th>
                                                    <th>Входная сумма</th>
                                                    <th>Общая стоимость</th>
                                                    <th>Маржинальность</th>
                                                    <th>Начислено</th>
                                                    <th>Статус</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.order ? this.state.order.map(order => (
                                                    <tr key={order.id}>
                                                        <td >
                                                            <Link to={{ pathname: `/orderpage/${order.id}`, order_id: order.id }}>
                                                                {order.id}
                                                            </Link>
                                                        </td>

                                                        <td>
                                                            <div>{order.user_phone.replace(/^(\d{3})(\d{2})\s*(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5')}</div>
                                                            <div className="small text-muted">
                                                                {order.user ? order.user.logged_at : null}
                                                            </div>
                                                        </td>
                                                        <td >
                                                            {order.created_at}
                                                        </td>

                                                        <td >
                                                            {order.delivered_at}
                                                        </td>

                                                        <td >
                                                            {order.cart.sum_initial_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум
                                                        </td>

                                                        <td>
                                                            <div className="clearfix">
                                                                <div className="float-left">
                                                                    <strong>{order.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум</strong>
                                                                </div>

                                                            </div>
                                                            <Progress className="progress-xs" color="success" value="100" />
                                                        </td>

                                                        <td>
                                                            <div className="clearfix">
                                                                <div className="float-left">
                                                                    <strong>{order.marginality.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум</strong>
                                                                </div>

                                                            </div>
                                                            <Progress className="progress-xs" color="warning" value="100" />
                                                        </td>

                                                        <td>
                                                            <div className="clearfix">
                                                                <div className="float-left">
                                                                    <strong>{order.bonus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум</strong>
                                                                </div>

                                                            </div>
                                                            <Progress className="progress-xs" color="danger" value="100" />
                                                        </td>

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
                                                    </tr>)) : null}
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
                    ) :  null}
          </div>
        );
    }
}

export default Personal;
