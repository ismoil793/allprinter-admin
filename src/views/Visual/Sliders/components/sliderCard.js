import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import {
  Card,
  CardBody,
  Button,
  CardImg,
  Badge
} from "reactstrap";

const ItemTypes = {
  CARD: 'card'
}

const SliderCard = ({ sliderUrl, bannerUrl, id, index, status, moveCard, updateHandler, deleteHandler }) => {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ opacity }, drag, preview] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })
  drag(drop(ref))
  return (
    <div ref={preview}>
      <Card style={{ opacity }}>
        <CardBody>
          <div className="row">
            <div className="col-sm-auto pr-4" ref={ref}>
              <div style={{cursor: "move"}}>
                <i className="fa fa-arrows" aria-hidden="true"></i>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-auto">
                  <h6>Изображение для большых экранов</h6>
                  <div >
                    <CardImg src={sliderUrl} alt="Card image cap" style={{maxWidth: "400px", height: "100px"}}/>
                  </div>
                </div>
                <div className="col-auto">
                  <h6>Изображение для маленьких экранов</h6>
                  <div >
                    <CardImg src={bannerUrl} alt="Card image cap" style={{maxWidth: "280px", height: "233px"}}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-auto d-flex flex-column justify-content-between">
              <h6>Статус: {status === 1 ? <Badge color="success">Активный</Badge> : <Badge color="danger">Неактивный</Badge>}</h6>
              <div>
                <Button
                  type="change"
                  color="secondary"
                  onClick={updateHandler}
                >
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  <span className="ml-1">
                    Изменить
                  </span>
                </Button>
                <Button
                  type="delete"
                  color="danger"
                  className="ml-2"
                  onClick={deleteHandler}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                  <span className="ml-1">
                    Удалить
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default SliderCard
