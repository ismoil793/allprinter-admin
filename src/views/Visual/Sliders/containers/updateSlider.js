import React, {useState, useEffect} from 'react'
import { Notyf } from 'notyf'
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
import { getOneSLider, updateSlider } from "../api";

const UpdateSlider = (props) => {
  const {$webSliders, $mobileSliders} = useStore($isDataPending);
  const {history, match} = props;

  const [sliderId, setSliderId] = useState(undefined);
  const [forValue, setForValue] = useState(undefined);
  const [sliderFile, setSliderFile] = useState(undefined);
  const [sliderUrl, setSliderUrl] = useState(undefined);
  const [bannerFile, setBannerFile] = useState(undefined);
  const [bannerUrl, setBannerUrl] = useState(undefined);
  const [sliderStatus, setSliderStatus] = useState(undefined);
  const [maxPos, setMaxPos] = useState(undefined);
  const [position, setPosition] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(undefined);
  const [language, setLanguage] = useState('ru',   getOneSLider(match.params.id).then(response => {
    setSliderId(response.data.data.id)
    setForValue(response.data.data.for)
    setSliderUrl(language === "ru" ? (response.data.data.background.ru ? response.data.data.background.ru.url : '') : (response.data.data.background.uz ? response.data.data.background.uz.url : '' ))
    setBannerUrl(language === "ru" ? (response.data.data.image.ru ? response.data.data.image.ru.url : '') : ( response.data.data.image.uz ? response.data.data.image.uz.url : '' ))
    setSliderStatus(response.data.data.active)
    setPosition(response.data.data.position + 1)
    if (response.data.data.url === null) {
      setImageUrl('')
    } else setImageUrl(response.data.data.url)
  }));
  
  useEffect(() => {
    if (match.params.hasOwnProperty("id")) {
      getOneSLider(match.params.id)
        .then(response => {
          setSliderId(response.data.data.id)
          setForValue(response.data.data.for)
          setSliderUrl(language === "ru" ? (response.data.data.background.ru ? response.data.data.background.ru.url : '') : (response.data.data.background.uz ? response.data.data.background.uz.url : '' ))
          setBannerUrl(language === "ru" ? (response.data.data.image.ru ? response.data.data.image.ru.url : '') : ( response.data.data.image.uz ? response.data.data.image.uz.url : '' ))
          setSliderStatus(response.data.data.active)
          setPosition(response.data.data.position + 1)
          if (response.data.data.url === null) {
            setImageUrl('')
          } else setImageUrl(response.data.data.url)
        })
    }
  }, []) //eslint-disable-line

  useEffect(() => {
    if (forValue !== undefined) {
      if (forValue === 1) {
        if ($mobileSliders.meta === undefined) {
          fetchMobileSliders()
        } else setMaxPos($mobileSliders.meta.total)
      }
      if (forValue === 2) {
        if ($webSliders.meta === undefined) {
          fetchWebSliders()
        } else setMaxPos($webSliders.meta.total)
      }
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
      banner: bannerFile,
      slider: sliderFile,
      position: position - 1,
      imageUrl: imageUrl,
      status: sliderStatus,
      language: language
    }
    
    updateSlider(sliderId, data) 
      .then(response => {
        notyf.success("Слайдер усепшно обновлен");
        
        if (forValue === 1) {
          history.push({
            pathname: '/visual/sliders/mobile',
            state: { updateStore: true }
          })
        } else if (forValue === 2) {
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
                <i className="fa fa-plus" aria-hidden="true"></i> Обновление слайда
                </Col>
                <Col>
                   <Input onChange={e => {
                    setLanguage(e.currentTarget.value)
                   }} type="select"  value={language} id="select">
                   <option value="">Выберите Язык</option>
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
                          onChange={(e) => handleFileInput(e, setBannerFile, setBannerUrl)}
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
                          onChange={(e) => handleFileInput(e, setSliderFile, setSliderUrl)}
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
                          value={position}
                          onChange={(e) => {setPosition(e.target.value)}}
                        />
                      </Col>
                      {/* <Col>
                        <p>Максимальное значение {maxPos}</p>
                      </Col> */}
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

export default UpdateSlider