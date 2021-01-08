import React, { Component } from "react";
import { httpPost } from "../../../api";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,

} from "reactstrap";

class EditItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warning: false,
      deduction_price: null,
      quantity: null,
      item_shop_id: null
    };

    this.toggleWarning = this.toggleWarning.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleWarning() {
    this.setState({
      warning: !this.state.warning
    });
  }
  componentWillReceiveProps() {
    this.setState({
      item_shop_id: this.props.item_shop_id,
      quantity: this.props.quantity
    });
  }

  itemUpdate = e => {
    const notyf = new Notyf();
    let formData = new FormData();

    if (this.state.item_shop_id) {
      formData.append("item_shop_id", this.state.item_shop_id);
    }

    if (this.state.quantity) {
      formData.append("quantity", this.state.quantity);
    }

    if (this.state.deduction_price) {
      formData.append("deduction_price", this.state.deduction_price);
    }

    e.preventDefault();

    httpPost({
        url: `api/admin/order/item/add/${localStorage.getItem(
          "order_id"
        )}`,
        data: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then(response => {
        notyf.success(`Вы изменили заказ `);
        this.props.callback();
        // this.setState({order: response.data.data})
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Button
          color="warning"
          size="sm"
          onClick={this.toggleWarning}
          className="mr-1"
        >
          Изменить
        </Button>
        <Modal
          isOpen={this.state.warning}
          toggle={this.toggleWarning}
          className={"modal-warning " + this.props.className}
        >
          <ModalHeader toggle={this.toggleWarning}>Изменить продукт</ModalHeader>
          <Form onSubmit={this.itemUpdate}>
            <ModalBody>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="select">Скидочная цена</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    onChange={this.handleChange}
                    type="text"
                    name="deduction_price"
                    value={this.state.deduction_price}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="select">Количество</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    onChange={this.handleChange}
                    type="text"
                    name="quantity"
                    value={this.state.quantity}
                  />
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                color="warning"
                onClick={this.toggleWarning}
              >
                Отправить
              </Button>{" "}
              <Button color="secondary" onClick={this.toggleWarning}>
                Закрыть
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default EditItems;
