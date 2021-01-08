import React, { Component } from "react";
import {
  Button,
  ButtonDropdown,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row
} from "reactstrap";
import { deleteNavigation } from "../api";
import { withRouter } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Link } from "react-router-dom";



class DropDownButtons extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false)
    };
  }

  DeleteSidebar = e => {
    const notyf = new Notyf();
    e.preventDefault();
    deleteNavigation(this.props.sidebarData.id)
      .then(response => {
        notyf.success("Вы удалили навигацию");
        this.props.getSidebars();
      })
      .catch(error => {
        console.log(error);
      });
  };

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray
    });
  }

  render() {
    const { sidebarData } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <ButtonDropdown
              className="mr-1"
              isOpen={this.state.dropdownOpen[10]}
              toggle={() => {
                this.toggle(10);
              }}
            >
              <Link
                to={{
                  pathname: `/navigations/${sidebarData.id}`,
                  sidebar_id: sidebarData.id
                }}
              >
                <Button id="caret" color="secondary">
                  <i className="fa fa-pencil"></i>
                </Button>
              </Link>

              <DropdownToggle caret color="secondary" />
              <DropdownMenu>
                <DropdownItem onClick={this.DeleteSidebar}>
                  Удалить
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(DropDownButtons);
