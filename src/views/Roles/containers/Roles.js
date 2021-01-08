import React, { useEffect, useState } from "react";
import {useStore} from "effector-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Col,
  Row,
  Table,
  Form, 
  FormGroup, 
  Label, 
  Input
} from "reactstrap";

import {$isDataPending} from '../model/stores'
import {fetchAllRoles} from '../model/effects'

import RoleButtons from "../components/RoleButtons";

const handleInputTextCahnge = (event, setSate) => {
  setSate(event.target.value)
}

const Roles = (props) => {
  const { $allRoles } = useStore($isDataPending);

  const [search, setSearch] = useState('');

  useEffect(() => {
    if(!$allRoles.data.length) {
      fetchAllRoles();
    }
  }, []) //eslint-disable-line

  const restFilterValues = () => {
    setSearch('');
  }

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
                        value={search}
                        onChange={(e) => handleInputTextCahnge(e, setSearch)}
                        placeholder=""
                      />
                    </Col>
                  </FormGroup>
                </Row>
              </Form>
            </CardBody>
            <CardFooter>
              <Button
                onClick={restFilterValues}
                type="reset"
                size="sm"
                color="danger"
              >
                <i className="fa fa-ban"></i> Сбросить
              </Button>
            </CardFooter>
          </Card>
        </Col>

        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <div className="row d-flex align-items-center justify-content-between">
                <div className="col-auto">
                  <i className="fa fa-align-justify"></i> Роли
                </div>
                <div className="col-auto">
                  <Link to='/userroles/roles/add'>
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
                    <th>Показываемое название </th>
                    <th>Описание</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {$allRoles.data
                    ? $allRoles.data.map(role => (
                        <tr key={role.id}>
                          <td>{role.id}</td>
                          <td>{role.name}</td>
                          <td>{role.display_name}</td>
                          <td>{role.description}</td>
                          <td>
                            <RoleButtons   
                              function={fetchAllRoles}
                              id={role.id} />
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

export default Roles;
