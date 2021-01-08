import React, { useState, useEffect } from "react";
import { useStore } from "effector-react";

import { createNavigation } from "../api";

import { Notyf } from "notyf";

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
  Badge
} from "reactstrap";

import { $isDataPending } from "../model/stores";
import { fetchAllNavigations } from "../model/effects";

const changeHandler = (e, setFunction) => {
  setFunction(e.target.value);
};

const checkboxHandler = (e, setFunction) => {
  setFunction(e.target.checked);
};

const AddNavigation = props => {
  const { $allNavigations } = useStore($isDataPending);

  const [name, setName] = useState("");
  const [type, setType ] = useState("");
  const [code, setCode] = useState("");
  const [navigationType, setNavigationType] = useState("nav");
  const [titleNav, setTitleNav] = useState(false);
  const [parentNav, setparentNav] = useState("default");
  const [icon, setIcon] = useState(undefined);
  const [badgeText, setBadgeText] = useState("");
  const [badgeType, setBadgeType] = useState("primary");
  const [externalLink, setExternalLink] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!$allNavigations.data.length) {
      fetchAllNavigations();
    }
  }, []); //eslint-disable-line

  useEffect(() => {
    navigationType === "title" ? setTitleNav(true) : setTitleNav(false);
  }, [navigationType]);

  const submitHandler = e => {
    e.preventDefault();
    const data = {
      name: "",
      code: "",
      type: "",
      active: 1,
      values: {}
    };
    const notyf = new Notyf();

    data.name = name;
    data.code = code;
    data.type  = type;
    data.active = isActive;
    // data.parent_id = isActive;
    data.values.name = {};
    data.values.name.value = name;
    if (navigationType !== "title" && navigationType !== "external") {
      data.values.url = {};
      data.values.url.value = `/${code}`;
    }

    if (navigationType !== "title" && navigationType !== "external") {
      data.values.type = {};
      data.values.type.value = type;
    }
    if (navigationType !== "title") {
      data.values.icon = {};
      data.values.icon.value = icon;
      if (parentNav !== "default") data.parent_id = parentNav;
    }
    if (titleNav) {
      data.values.title = {};
      data.values.title.value = 1;
      data.values.title.type = "boolean";
    }
    if (navigationType === "nav+badge") {
      data.values.badge = {};
      data.values.badge.value = {};
      data.values.badge.value.text = badgeText;
      data.values.badge.value.variant = badgeType;
    }
    if (navigationType === "external") {
      data.values.url = {};
      data.values.url.value = externalLink;
      data.values.target = {};
      data.values.target.value = "_blank";
    }

    createNavigation(data).then(response => {
      notyf.success("Успешно добавлен");
      fetchAllNavigations();
      props.history.push("/navigations");
    });
  };

  // console.log($allNavigations)

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <Row>
                <Col xs="12" md="3">
                  <strong>Добавление Навигации</strong>
                </Col>
              </Row>
            </CardHeader>
            <Form className="form-horizontal" onSubmit={submitHandler}>
              <CardBody>
                <FormGroup row>
                  <Col md="4">
                    <Label htmlFor="text-input">
                      Название навигации <span className="red-star">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      placeholder=""
                      value={name}
                      required
                      onChange={event => changeHandler(event, setName)}
                    />
                  </Col>
                  <Col md="4">
                    <Label htmlFor="text-input">
                      Кодовое название (на латинском, без спец. символов){" "}
                      <span className="red-star">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="code"
                      placeholder=""
                      value={code}
                      required
                      onChange={event => changeHandler(event, setCode)}
                    />
                  </Col>
                  <Col md="4">
                    <Label htmlFor="text-input">
                     Относится к Админке/Складу
                      <span className="red-star">*</span>
                    </Label>
                    <Input
                          type="select"
                          name="type"
                          required
                          value={type}
                          onChange={event => changeHandler(event, setType)}
                        >
                          <option value="default">Выберите значение</option>
                        
                                <option value="stock">
                                 Склад
                                </option>

                                <option value="admin">
                                 Админ панель
                                </option>
                             
                          </Input>
                  </Col>
                </FormGroup>
                <h6>Тип навигации</h6>
                <FormGroup
                  row
                  onChange={event => changeHandler(event, setNavigationType)}
                >
                  <Col>
                    <FormGroup check className="pl-4">
                      <Label check className="no-select">
                        <Input
                          type="radio"
                          name="radio2"
                          value="nav"
                          checked={navigationType === "nav" ? true : false}
                        />
                        Навигация
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup check className="pl-4">
                      <Label check className="no-select">
                        <Input
                          type="radio"
                          name="radio2"
                          value="nav+badge"
                          checked={
                            navigationType === "nav+badge" ? true : false
                          }
                        />
                        Навигация + Значок
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup check className="pl-4">
                      <Label check className="no-select">
                        <Input
                          type="radio"
                          name="radio2"
                          value="title"
                          checked={navigationType === "title" ? true : false}
                        />
                        Заголовок
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup check className="pl-4">
                      <Label check className="no-select">
                        <Input
                          type="radio"
                          name="radio2"
                          value="external"
                          checked={navigationType === "external" ? true : false}
                        />
                        Внешная ссылка
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                {navigationType !== "title" ? (
                  <>
                    <FormGroup row>
                      <Col md="6">
                        <Label htmlFor="text-input">
                          Иконка навигации <span className="red-star">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="icon"
                          required
                          value={icon}
                          onChange={event => changeHandler(event, setIcon)}
                        />
                      </Col>
                      <Col md="6">
                        <Label htmlFor="text-input">
                          Родителская Навигация
                        </Label>
                        <Input
                          type="select"
                          name="parentNav"
                          required
                          value={parentNav}
                          onChange={event => changeHandler(event, setparentNav)}
                        >
                          <option value="default">Выберите значение</option>
                          {$allNavigations.data.map(elem => {
                            if (
                              !elem.title &&
                              elem.title !== "web" &&
                              elem.title !== "mobile" &&
                              !elem.external
                            )
                              return (
                                <option
                                  key={elem.id}
                                  value={elem.id}
                                  disabled={!elem.active}
                                >
                                  {elem.name}
                                </option>
                              );
                            return null;
                          })}
                        </Input>
                      </Col>
                    </FormGroup>
                  </>
                ) : null}
                {navigationType === "nav+badge" ? (
                  <>
                    <h6>
                      Значок{" "}
                      <Badge color={badgeType}>
                        {badgeText.length ? badgeText : "пример"}
                      </Badge>
                    </h6>
                    <FormGroup row>
                      <Col md="6">
                        <Label htmlFor="text-input">
                          Текст значка <span className="red-star">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="badgeText"
                          required
                          value={badgeText}
                          onChange={event => changeHandler(event, setBadgeText)}
                        />
                      </Col>
                      <Col md="6">
                        <Label htmlFor="text-input">
                          Тип значка <span className="red-star">*</span>
                        </Label>
                        <Input
                          type="select"
                          name="badgeType"
                          required
                          value={badgeType}
                          onChange={event => changeHandler(event, setBadgeType)}
                        >
                          <option value="primary">Первичный</option>
                          <option value="secondary">Второстепенный</option>
                          <option value="success">Успех</option>
                          <option value="danger">Опасность</option>
                          <option value="warning">Предупреждение</option>
                          <option value="info">Информация</option>
                          <option value="light">Светлый</option>
                          <option value="dark">Темный</option>
                        </Input>
                      </Col>
                    </FormGroup>
                  </>
                ) : null}
                {navigationType === "external" ? (
                  <FormGroup row>
                    <Col md="6">
                      <Label htmlFor="text-input">Ссылка</Label>
                      <Input
                        type="text"
                        name="link"
                        value={externalLink}
                        required
                        onChange={event =>
                          changeHandler(event, setExternalLink)
                        }
                      />
                    </Col>
                  </FormGroup>
                ) : null}
                <hr />
                <FormGroup row>
                  <Col md="12">
                    <Label check className="ml-4 no-select">
                      <Input
                        type="checkbox"
                        name="active"
                        placeholder=""
                        checked={isActive}
                        onClick={event => checkboxHandler(event, setIsActive)}
                      />{" "}
                      Активный
                    </Label>
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary">
                  <i className="fa fa-dot-circle-o" /> Сохранить
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddNavigation;
