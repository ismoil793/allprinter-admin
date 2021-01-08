import React, { Component } from 'react';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { httpDelete } from "../../../api";
import { Link } from 'react-router-dom'


const UpdateLink = props => (
  <>
    <Link to={{pathname:`/updateadverts/${props.ad_id}`, ad_id: props.ad_id}}>
    <Button id="caret" color="secondary"> <i className="fa fa-pencil"></i></Button>
    </Link>
  </>
)

class UpdateDeleteAds extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false),
    };
  } 

U

  DeleteCategory= (e) => {

      httpDelete({
        url: `api/admin/ad/delete/${this.props.id}` 
      })
      .then(response => {
       
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
                 <UpdateLink ad_id={this.props.id} />
                  <DropdownToggle caret color="secondary" />
                  <DropdownMenu>
                   <DropdownItem onClick={this.DeleteCategory}>Удалить</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
            </Col>
        </Row>
      </div>
    );
  }
}

export default UpdateDeleteAds;
