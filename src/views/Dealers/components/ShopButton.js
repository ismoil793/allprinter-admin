import React, { Component } from 'react';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { httpDelete } from "../../../api";
import { Link } from 'react-router-dom'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const UpdateLink = props => (
  <>
<Link to={{pathname: `/suppliers/updateshops/${props.shop_id}`, shop_id: props.shop_id}}>
<Button id="caret" color="secondary"> <i className="fa fa-pencil"></i></Button>
</Link>
  </>
)

class UpdateDeleteShops extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false),
    };
  } 

  


  DeleteShop = (e) => {
    const notyf = new Notyf()
    e.preventDefault()
      httpDelete({
        url: `api/admin/dealer/shop/delete/${this.props.id}` 
      })
      .then(response => {
        this.props.function()
        notyf.error('Вы удалили магазин')
       
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
                  <UpdateLink shop_id={this.props.id} />
                  <DropdownToggle caret color="secondary" />
                  <DropdownMenu>
                   <DropdownItem onClick={this.DeleteShop}>Удалить</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
            </Col>
        </Row>
      </div>
    );
  }
}

export default UpdateDeleteShops;
