import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Row
} from "reactstrap";
import { Table } from "reactstrap";
import { Form, FormGroup, Label, Input, Badge } from "reactstrap";
import { httpGet } from "../../../api";
import ActionButtonDelete from "./DeleteUpdateStatement";

class Statements extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statements: [],
            search: '',
            status: null,

        };
    }

    componentDidMount() {
        this.getStatements();
    }

    getStatements = () => {
        httpGet({
            url: "api/clerk/cashbox/link",
        })
            .then(response => {
                this.setState({
                    statements: response.data.data,

                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleChange = e => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value }, () => {
            setTimeout(() => {
                this.getStatements();
            }, 100);
        });
    };

    Reset = () => {
        this.setState({
            search: '',
            status: null
        }, () => {
            this.getStatements();
        });
    }

    render() {
        const { statements } = this.state;

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <strong>Фильтры</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                    <Row>
                                        <FormGroup column>
                                            <Col md="12">
                                                <Label htmlFor="text-input">Поиск</Label>
                                            </Col>
                                            <Col xs="12" md="12">
                                                <Input type="text" id="text-input" name="search" value={this.state.search} onChange={this.handleChange} placeholder="" />

                                            </Col>
                                        </FormGroup>

                                        <FormGroup column>
                                            <Col md="3">
                                                <Label htmlFor="text-input">Статус</Label>
                                            </Col>
                                            <Col xs="12" md="12">
                                                <Input type="select" name="status" value={this.state.status} onChange={this.handleChange} id="select">
                                                    <option value=""> Выберите статус </option>
                                                    <option value="1">Активный</option>
                                                    <option value="0">Не активный</option>
                                                </Input>

                                            </Col>
                                        </FormGroup>

                                    </Row>

                                </Form>
                            </CardBody>
                            <CardFooter>

                                <Button onClick={this.Reset} type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Сбросить</Button>
                            </CardFooter>
                        </Card>
                    </Col>

                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <div className="row d-flex align-items-center justify-content-between">
                                    <div className="col-auto">
                                        <i className="fa fa-align-justify"></i> Линки
                                  </div>
                                    <div className="col-auto">
                                        <Link to='/statement/add'>
                                            <Button className="fa fa-plus" color="primary">
                                                <span className="ml-1">Добавить</span>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Наименование</th>
                                            <th>Статус</th>
                                            <th>Действие</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {statements
                                            ? statements.map(statement => (

                                                <tr>
                                                    <td>{statement.id}</td>
                                                    <td>{statement.name}</td>
                                                    <td>
                                                        {statement.status ? (
                                                         <Badge color="success">Активный</Badge>
                                                        ) : (
                                                         <Badge color="danger">Не активный</Badge>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <ActionButtonDelete function={this.getStatements} id={statement.id} />
                                                    </td>
                                                </tr>
                                            ))
                                            : null}
                                    </tbody>
                                </Table>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Statements;
