import React, { Component } from "react";
import { httpPost } from "../../../api";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import {Button} from "reactstrap";

class ComportalItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_shop_id: ''
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

  ComportalItem = e => {
    const notyf = new Notyf();
    e.preventDefault();

    httpPost({
        url: `api/admin/order/item/comportal/${localStorage.getItem(
          "order_id"
        )}`,
        data: { item_shop_id: this.state.item_shop_id } 
      })
      .then(response => {
      
        notyf.success(`Вы отправили Item `);
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
          color="success"
          size="sm"
          onClick={this.ComportalItem}
          className="mr-1"
        >
          Отправить
        </Button>
      </div>
    );
  }
}

export default ComportalItem;
