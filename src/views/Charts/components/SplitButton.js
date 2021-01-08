import React, { Component } from 'react';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { Link } from 'react-router-dom'

const UpdateLink = props => (
  <>
  <Link to={{pathname:`/orderpage/${props.order_id}`, order_id: props.order_id}}>
  <Button id="caret" color="info"> <i className="fa fa-eye"></i></Button>
  </Link>
  </>
)

class SplitButton extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false),
    };
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
                 <UpdateLink order_id={this.props.id}/>
                  <DropdownToggle caret color="info" />
                  <DropdownMenu>
                    
                    <DropdownItem>Редактировать</DropdownItem>
                   
                  </DropdownMenu>
                </ButtonDropdown>
            </Col>
        </Row>
      </div>
    );
  }
}

export default SplitButton;
