import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { httpDelete } from "../../api";
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'


class DeleteProduct extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false),
    };
  }


  Delete = (e) => {
    const notyf = new Notyf()
    e.preventDefault()
      httpDelete({
        url: 'api/admin/cart/delete',
        data: {          
          cart_id: this.props.cart_id,
          item_shop_id: this.props.item_shop_id 
        }
       }) 
       .then(response => {
      notyf.error('Вы удалили продукт')
      this.props.function()
    })
    .catch(error =>{
      console.log(error)
    })
}

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
          <Button onClick={this.Delete} type="submit" size="sm" color="danger">
                    <i className="fa fa-dot-circle-o"></i> Удалить
                  </Button>
            </Col>
        </Row>
      </div>
    );
  }
}

export default DeleteProduct;
