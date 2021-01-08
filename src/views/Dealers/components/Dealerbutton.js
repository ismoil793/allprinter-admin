import React, { Component } from 'react';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { httpDelete } from "../../../api";
import {Link} from 'react-router-dom'
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

// const UpdateLink = props => (
//   <>
//     <Link to={{pathname:`/dealers/dealercard/${props.dealer_id}`, dealer_id: props.dealer_id}}>
//     <Button id="caret" color="info"> <i className="fa fa-eye"></i></Button>
//     </Link>
//   </>
// )

const AddShop = props => (
  <>
    <Link to={{pathname: `/dealers/addshop/${props.dealer_id}`, dealer_id: props.dealer_id}}>
    <DropdownItem>Добавить магазин</DropdownItem>
    </Link>
  </>
)



class DealerBtn extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false),
    };
  }


  DeleteUser= (e) => {
    const notyf = new Notyf();
    httpDelete({
      url: `api/admin/dealer/delete/${this.props.id}` 
    })
    .then(response => {
      this.props.function()
      notyf.success("Вы удалили Дилера");
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
              
                 <Link to={{pathname:`/suppliers/dealercard/${this.props.id}`, dealer_id: this.props.id}}>
                   <Button id="caret" color="info"> <i className="fa fa-eye"></i></Button>
                  </Link>
                  <DropdownToggle caret color="info" />
                  <DropdownMenu>
                 <AddShop dealer_id={this.props.id}/>
                   
                   <DropdownItem onClick={this.DeleteUser}>Удалить</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
            </Col>
        </Row>
      </div>
    );
  }
}

export default DealerBtn;
