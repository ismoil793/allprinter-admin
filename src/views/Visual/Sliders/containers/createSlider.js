import React, {useState, useEffect} from 'react'
import qs from 'qs'
import { Notyf } from 'notyf';
import { useStore } from "effector-react";
import Switch from "react-switch";


import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardImg,
  Button,
  Col,
  Row,
  Form, 
  FormGroup, 
  Label, 
  Input
} from "reactstrap";

import { fetchMobileSliders, fetchWebSliders } from "../model/effects";
import { $isDataPending } from "../model/stores";
import { createSlider } from "../api";

const CreateSlider = (props) => {
  const {$webSliders, $mobileSliders} = useStore($isDataPending);
  const {history} = props;
  const [formTitle, setFormTitle] = useState('');

  const [forValue, setForValue] = useState(undefined);
  const [slider, setSlider] = useState(undefined);
  const [sliderUrl, setSliderUrl] = useState(undefined);
  const [banner, setBanner] = useState(undefined);
  const [bannerUrl, setBannerUrl] = useState(undefined);
  const [position, setPosition] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(undefined);
  const [sliderStatus, setSliderStatus] = useState(1);
  const [maxPos, setMaxPos] = useState(undefined);
  const [language, setLanguage] = useState('ru');

  useEffect(() => {
    setForValue(qs.parse(props.location.search, { ignoreQueryPrefix: true }).for);
  }, []) //eslint-disable-line

  useEffect(() => {
    if (forValue !== undefined) {
      if (forValue === '1') {
        setFormTitle("Добавить слайд <<Мобильная версия>>")
        if ($mobileSliders.meta === undefined) {
          fetchMobileSliders()
        } else setMaxPos($mobileSliders.meta.total)
      } else if (forValue === '2') {
        setFormTitle("Добавить слайд <<Веб версия>>")
        if ($webSliders.meta === undefined) {
          fetchWebSliders()
        } else setMaxPos($webSliders.meta.total)
      } else  history.push("/")
    }
  }, [forValue]) //eslint-disable-line
  
  const handleFileInput = (event, setFile, setUrl) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setUrl(url);
    setFile(file);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const notyf = new Notyf()
    const data = {
      for: forValue,
      banner: banner,
      slider: slider,
      position: position,
      imageUrl: imageUrl,
      status: sliderStatus,
      language: language
    }
    
    createSlider(data) 
      .then(response => {
        notyf.success("Слайдер усепшно добавлен");
        if (forValue === '1') {
          history.push({
            pathname: '/visual/sliders/mobile',
            state: { updateStore: true }
          })
        } else if (forValue === '2') {
          history.push({
            pathname: '/visual/sliders/web',
            state: { updateStore: true }
          })
        }
      })
  }
  
  return (  
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                <i className="fa fa-plus" aria-hidden="true"></i> {formTitle}
                </Col>
                <Col>
                   <Input onChange={e => setLanguage(e.currentTarget.value)} type="select"  value={language} id="select">
                   <option value="" >Выберите Язык</option>
                     <option value="ru">ru</option>
                     <option value="uz">uz</option>
                   </Input>
                 </Col>
               
              </Row>
            </CardHeader>
            <Form className="form-horizontal" onSubmit={(e) => submitHandler(e)}>
              <CardBody>
                <Row>
                  <Col md="12">
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="file-input">
                          Добавить изображение для маленьких экранов
                        </Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          id="banner-file-input"
                          type="file"
                          required
                          onChange={(e) => handleFileInput(e, setBanner, setBannerUrl)}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  {bannerUrl &&
                    <Col className="d-flex justify-content-center" md="12">
                      <div className="mb-4">
                        <CardImg src={bannerUrl} alt="Card image cap" style={{border: "1px solid #eee"}}/>
                      </div>
                    </Col>
                  }
                  <Col md="12">
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="file-input">
                          Добавить изображение для широких экранов
                        </Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          id="slider-file-input"
                          type="file"
                          required
                          onChange={(e) => handleFileInput(e, setSlider, setSliderUrl)}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  {sliderUrl &&
                    <Col className="d-flex justify-content-center" md="12">
                      <div className="mb-4">
                        <CardImg src={sliderUrl} alt="Card image cap" style={{border: "1px solid #eee"}}/>
                      </div>
                    </Col>
                  }
                  <Col md="12">
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="file-input">
                          Статус
                        </Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Switch 
                          onChange={(e) => {e ? setSliderStatus(1) : setSliderStatus(0)}} 
                          height={20}
                          width={40}
                          checked={sliderStatus ? true : false} />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="file-input">
                          Позиция
                        </Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          id="position"
                          type="number"
                          min={1}
                          max={maxPos}
                          step="1"
                          // disabled
                          value={position}
                          onChange={(e) => {setPosition(e.target.value)}}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="file-input">
                          Укажите ссылку
                        </Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          id="url"
                          type="text"
                          value={imageUrl}
                          onChange={(e) => {setImageUrl(e.target.value)}}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  color="success"
                >
                  <i className="fa fa-floppy-o" aria-hidden="true"></i> Сохранить
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CreateSlider