import React, { Component } from "react";
import { httpDelete } from "../../../api";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import {Button} from "reactstrap";

class DeleteItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_shop_id: null
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps() {
    this.setState({
      item_shop_id: this.props.item_shop_id
    });
  }

  DeleteItem = e => {
    const notyf = new Notyf();
    e.preventDefault();

    httpDelete({
        url: `api/admin/order/item/remove/${localStorage.getItem(
          "order_id"
        )}`,
        data: { item_shop_id: this.state.item_shop_id } 
      })
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
          color="danger"
          size="sm"
          onClick={this.DeleteItem}
          className="mr-1"
        >
          Удалить
        </Button>
      </div>
    );
  }
}

export default DeleteItem;
