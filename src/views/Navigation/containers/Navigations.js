import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "effector-react";

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Badge,
  Col,
  Row,
  Table,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { $isDataPending } from "../model/stores";
import { fetchAllNavigations } from "../model/effects";

import DropdownButtons from "../components/DropdownButtons";

const handleInputTextCahnge = (event, setSate) => {
  setSate(event.target.value);
};

const Navigations = props => {
  let filteredNavigations = [];
  const { $allNavigations } = useStore($isDataPending);

  const [searchActive, setSearchActive] = useState("default");

  useEffect(() => {
    if (!$allNavigations.data.length) {
      fetchAllNavigations();
    }
  }, []); //eslint-disable-line

  const resetFilterValues = () => {
    setSearchActive("default");
  };

  if ($allNavigations.data) {
    if (searchActive !== "default") {
      filteredNavigations = $allNavigations.data.filter(
        sidebar => sidebar.active.toString() === searchActive
      );
    } else filteredNavigations = $allNavigations.data;
  } else filteredNavigations = null;


  console.log(filteredNavigations)
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
                    <Col md="3">
                      <Label htmlFor="text-input">Состояние</Label>
                    </Col>
                    <Col xs="12" md="12">
                      <Input
                        type="select"
                        name="active"
                        value={searchActive}
                        onChange={e =>
                          handleInputTextCahnge(e, setSearchActive)
                        }
                        id="select"
                      >
                        <option value="default"> Выберите статус </option>
                        <option value={1}>Активный</option>
                        <option value={0}>Не активный</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Row>
              </Form>
            </CardBody>
            <CardFooter>
              <Button
                onClick={resetFilterValues}
                type="reset"
                size="sm"
                color="danger"
              >
                <i className="fa fa-ban" /> Сбросить
              </Button>
            </CardFooter>
          </Card>
        </Col>

        <Col xs="12" lg="12">
          <Card>
            <CardHeader>
              <div className="row d-flex align-items-center justify-content-between">
                <div className="col-auto">
                  <i className="fa fa-align-justify"></i> Навигации
                </div>
                <div className="col-auto">
                  <Link to="/navigations/add">
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
                    <th>№</th>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Кодовое название</th>
                    <th>Назначение</th>
                    <th>Состояние</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNavigations.map((navigation, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{navigation.id}</td>
                      <td>{navigation.name}</td>
                      <td>{navigation.code}</td>
                      <td>{navigation.type}</td>
                      <td>
                        {navigation.active ? (
                          <Badge color="success">Активный</Badge>
                        ) : (
                          <Badge color="danger">Не активный</Badge>
                        )}
                      </td>
                      <td>
                        <DropdownButtons
                          getSidebars={fetchAllNavigations}
                          sidebarData={navigation}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Navigations;
