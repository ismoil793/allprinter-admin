import React, {useState, useCallback, useEffect} from 'react'
import { Link } from "react-router-dom"
import update from 'immutability-helper'

import { Notyf } from 'notyf'

import {useStore} from "effector-react";

import { updateSlidersPosition, deleteSlider } from "../api";
import { fetchWebSliders } from "../model/effects";
import { $isDataPending } from "../model/stores";

import SliderCard from '../components/sliderCard'

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Col,
  Row,
  Spinner,
  Input
} from "reactstrap";

const MainWeb = (props) => {
  const {history, location} = props;
  const {$webSliders} = useStore($isDataPending);
  const notyf = new Notyf();
  const [cards, setCards] = useState([]);
  const [language, setLanguage] = useState('ru');

console.log(language)
  useEffect(() => {
    if(!$webSliders.data.length) {
      fetchWebSliders();
    }
  }, []) //eslint-disable-line

  useEffect(() => {
    if(location.state !== undefined && location.state.updateStore) {
      fetchWebSliders();
    }
  }, [location.state])

  useEffect(() => {
    if($webSliders.data.length) {
      const temp = $webSliders.data.map(item => {
        return {id: item.id,
          sliderUrl: language === "ru" ? (item.background.ru ? item.background.ru.url : '') : (item.background.uz ? item.background.uz.url : ''), 
          bannerUrl: language === "ru" ? (item.image.ru ? item.image.ru.url : '') : (item.image.uz ? item.image.uz.url : ''),   
          status: item.active}
      })
      console.log(temp)
      setCards(temp)
    }
  }, [$webSliders.data])
  
  const updateHandler = (id) => {
    history.push(`/visual/sliders/${id}`)
  }

  const deleteHandler = (id) => {
    deleteSlider(id)
      .then(response => {
        notyf.success("Удалено")
        fetchWebSliders();
      })
  }

  const savePositionsHandler = () => {
    const tempArr = cards.map(item => item.id)
    updateSlidersPosition({for: 2, slider_ids: tempArr})
      .then(response => {
        notyf.success("Изменено")
        fetchWebSliders();
      })
  }

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex]
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      )
    },
    [cards],
  )
  const renderCard = (card, index) => {
    
    return (
      <SliderCard
        key={card.id}
        id={card.id}
        index={index}
        sliderUrl={card.sliderUrl}
        bannerUrl={card.bannerUrl}
        status={card.status}
        updateHandler={() => updateHandler(card.id)}
        deleteHandler={() => deleteHandler(card.id)}
        moveCard={moveCard}
        language={language}
      />
    )
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <div className="row d-flex align-items-center justify-content-between">
                <div className="col-auto">
                  <i className="fa fa-align-justify"></i> Список слайдов
                </div>
                <div className="col-auto">
                   <Input onChange={e => {
                     setLanguage(e.currentTarget.value)
                     fetchWebSliders()}
                    } type="select"  value={language} id="select">
                   <option value="">Выберите Язык</option>
                     <option value="ru">ru</option>
                     <option value="uz">uz</option>
                 </Input>
                </div>
                <div className="col-auto">
                  <Link to={{
                              pathname: "/visual/sliders/add",
                              search: '?for=2',
                              state: "hello"
                            }}>
                    <Button className="fa fa-plus" color="primary">
                      <span className="ml-1">Добавить</span>
                    </Button>
                  </Link>
                </div> 
              </div>
            </CardHeader>
            <CardBody>
              {$webSliders.loading ?
                <div className="my-4 d-flex justify-content-center">
                  <Spinner style={{ width: '3rem', height: '3rem' }} />
                </div>
              : 
                $webSliders.meta !== undefined ?
                  $webSliders.meta.total ?
                    <>
                      <p>Используя <span><i className="fa fa-arrows" aria-hidden="true"></i></span> кнопку можете менять позициую слайдов. После изменений не забудьте нажать кнопку "Сохранить" в конце</p>
                      {cards.map((card, i) => renderCard(card, i))}
                    </>
                    : <p>Ещё нет добавленных слайдов</p>
                : null
              }
            </CardBody>
            <CardFooter>
              <Button
                type="save"
                color="success"
                disabled={cards.length ? false : true}
                onClick={savePositionsHandler}
              >
                <i className="fa fa-floppy-o" aria-hidden="true"></i> Сохранить
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default MainWeb