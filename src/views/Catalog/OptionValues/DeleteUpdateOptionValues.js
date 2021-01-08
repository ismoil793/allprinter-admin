import React, { Component } from 'react';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { httpDelete } from "../../../api";
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import {Link} from 'react-router-dom'

const UpdateLink = props => (
  <>
    <Link to={{pathname:`/catalog/updateoptionvalues/${props.feature_value_id}`, feature_value_id: props.feature_value_id}}>
    <Button id="caret" color="secondary"> <i className="fa fa-pencil"></i></Button>
    </Link>
  </>
)

class UpdateDeleteOptionValues extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false)
    };
  } 




  DeleteClass = (e) => {
    const notyf = new Notyf()
    e.preventDefault()
      httpDelete({
        url:`api/admin/value/delete/${this.props.id}` 
      })
      .then(response => {
    
        notyf.error('Вы удалили значение характеристики')
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
         <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[10]} toggle={() => { this.toggle(10); }}>
         <UpdateLink feature_value_id={this.props.id} />
                  <DropdownToggle caret color="secondary" />
                  <DropdownMenu>
                   <DropdownItem onClick={this.DeleteClass}>Удалить</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
            </Col>
        </Row>
      </div>
    );
  }
}

export default UpdateDeleteOptionValues;
