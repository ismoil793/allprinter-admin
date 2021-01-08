import React, { useState, useEffect } from 'react';
import {useStore} from "effector-react";

import Select from 'react-select';
import { Notyf } from 'notyf'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

import { resetAllRoles } from "../model/events";
import { $isDataPending as $navigationsStore } from "../../Navigation/model/stores";
import { fetchAllLeafNavigations } from "../../Navigation/model/effects";
import { createUpdateRole } from "../api";

const handleInputTextCahnge = (event, setSate) => {
  setSate(event.target.value)
}

const AddRole = (props) => {
  const { $allLeafNavigations } = useStore($navigationsStore);

  const [name, setName] = useState('')
  const [display_name, setDisplay_name] = useState('')
  const [description, setDescription] = useState('')
  const [sidebarValues, setSidebarValues] = useState([])
  const [navigationOptions, setNavigationOptions] = useState([])


  useEffect(() => {
    if(!$allLeafNavigations.data.length) {
      fetchAllLeafNavigations();
    }
  }, []) //eslint-disable-line

  useEffect(() => {
    if($allLeafNavigations.data.length) {
      const temp = $allLeafNavigations.data.map(navigation => ({id: navigation.id, value: navigation.code, label: navigation.name, active: navigation.active}))
      setNavigationOptions(temp)
    }
  }, [$allLeafNavigations.data])

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {};
    const notyf = new Notyf()
    const {history} = props;

    data.name = name;
    data.display_name = display_name;
    data.description = description;
    data.sidebar_ids = sidebarValues.map(value => value.id);

    createUpdateRole(data)
      .then(response => {
        notyf.success('Роль успешно добавлен');
        resetAllRoles();
        history.push('/userroles/roles');
      })
  }
  
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <Row> 
                <Col xs="12" md="2">
                  <strong>Добавление роли</strong> 
                </Col>
              </Row>
            </CardHeader>
            <Form className="form-horizontal" onSubmit={submitHandler}>
              <CardBody>
                <Row>
                  <Col md="4"> 
                    <FormGroup row>
                      <Col md="12">
                        <Label htmlFor="name">Название Роли <span className="red-star">*</span></Label>
                        <Input
                          type="text" 
                          name="name" placeholder="" 
                          value={name}  
                          required
                          onChange={(e) => handleInputTextCahnge(e, setName)}/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md="4"> 
                    <FormGroup row>
                      <Col md="12">
                        <Label htmlFor="display_name">Показываемое наименование роли <span className="red-star">*</span></Label>
                        <Input
                          type="text" 
                          name="display_name" placeholder="" 
                          value={display_name}   
                          required
                          onChange={(e) => handleInputTextCahnge(e, setDisplay_name)}/>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="8"> 
                    <FormGroup row>
                      <Col md="12">
                        <Label htmlFor="description">Описание</Label>
                        <Input
                          type="textarea" 
                          name="description" 
                          placeholder="" 
                          rows={3}
                          value={description}  
                          onChange={(e) => handleInputTextCahnge(e, setDescription)}/>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup row>
                  <Col >
                    <Label htmlFor="sidebarValues">Выберите навигации доступные для этого роли</Label>
                    <Select
                      value={sidebarValues}
                      isMulti
                      name="sidebarValues"
                      options={navigationOptions}
                      onChange={(value) => {setSidebarValues(value)}}
                      className="basic-multi-select"
                      placeholder=""
                    />
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Сохранить</Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AddRole;
