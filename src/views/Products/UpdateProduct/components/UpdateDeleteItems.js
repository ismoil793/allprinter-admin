import React, { Component } from 'react';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { httpDelete } from "../../../../api";
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

// const UpdateLink = props => (
//   <>
// <Link to={{pathname: `/buttons/updateproduct/${props.product_id}`, updateproduct_id: props.product_id}}>
// <Button id="caret" color="secondary"> <i className="fa fa-pencil"></i></Button>
// </Link>
//   </>
// )

class UpdateDeleteItems extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false),
    };
  } 

  callBack = () => {
    this.props.IndexCall(this.props.index)
  }


  DeleteItem = (e) => {
    const notyf = new Notyf()
    e.preventDefault()
      httpDelete({
        url:`api/admin/product/item/shop/${this.props.item_shop_id}` 
      })
      .then(response => {
   
        this.props.getProducts()
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
         <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[10]} toggle={() => { this.toggle(10); }}>
                  {/* <UpdateLink product_id={this.props.id} /> */}
                  <Button onClick={this.callBack} id="caret" color="secondary"> <i className="fa fa-pencil"></i></Button>
                  <DropdownToggle caret color="secondary" />
                  <DropdownMenu>
                   <DropdownItem onClick={this.DeleteItem}>Удалить</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
            </Col>
        </Row>
      </div>
    );
  }
}

export default UpdateDeleteItems;
