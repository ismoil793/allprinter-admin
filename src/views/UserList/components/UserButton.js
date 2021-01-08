import React, { Component } from 'react';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { httpDelete } from "../../../api";
import {Link} from 'react-router-dom'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
const UpdateLink = props => (
  <>
<Link to={{pathname: `/clients/${props.user_id}`, user_id: props.user_id}}>
<Button id="caret" color="info"> <i className="fa fa-eye"></i></Button>
</Link>
  </>
)

class UserBtn extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false),
    };
  }


  DeleteUser= (e) => {
    const notyf = new Notyf()
    e.preventDefault()
    httpDelete({
      url:`api/admin/user/delete/${this.props.id}` 
    })
    .then(response => {
      notyf.error('Вы удалили Юзера')
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
                 <UpdateLink user_id={this.props.id}/>
                  <DropdownToggle caret color="info" />
                  <DropdownMenu>
                  {/* <DropdownItem>Активировать</DropdownItem>
                    <DropdownItem>Заблокировать</DropdownItem> */}
                   <DropdownItem onClick={this.DeleteUser}>Удалить</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
            </Col>
        </Row>
      </div>
    );
  }
}

export default UserBtn;
