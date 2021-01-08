import React, { Component } from "react";
import { httpGet } from "../../../api";
// import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Input, ListGroup, ListGroupItem } from "reactstrap";

class SearchItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: "",
      items: [],
      isShow: false,
      item_id: null
    };
  }

  handleChange = e => {
    this.setState({ searching: e.target.value }, () => {
      this.SearchProduct();
    });
  };

  SearchProduct = e => {
    httpGet({
      url: "api/clerk/items",
        params: {
          search: this.state.searching,
          active: 1
        }
      })
      .then(response => {
        this.setState({
          isShow: true,
          items: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleClick(option) {
    this.setState({
      searching: option.product.name,
      isShow: false,
      item_id: option.id
    });
    this.props.itemFunction(option.id);
  }

  render() {
    let displayList = this.state.items.map(option => {
      return (
        <div
          className="dataoption"
          data-id={option.id}
          onClick={() => this.handleClick(option)}
        >
          {/* <div className="dataimage"><img src={option.image} alt={option.value} /> </div> */}
          <ListGroupItem tag="a"  action> {option.product.name} </ListGroupItem>
        </div>
      );
    });
    return (
      <div className="animated fadeIn">
        <Input
          onChange={this.handleChange}
          type="text"
          name="searching"
          value={this.state.searching}
          placeholder="Поиск продуктов ..."
        />
        {this.state.isShow ? <ListGroup>{displayList}</ListGroup> : null}
      </div>
    );
  }
}

export default SearchItems;
