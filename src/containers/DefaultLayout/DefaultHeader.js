import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {Redirect} from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem
} from "reactstrap";
import PropTypes from "prop-types";
import {httpGet} from "../../api";
import Cookies from "universal-cookie";
import {Notyf} from "notyf";
import "notyf/notyf.min.css";
import {AppNavbarBrand, AppSidebarToggler} from "@coreui/react";
import logo from "../../assets/img/brand/logo2.jpg";
import sygnet from "../../assets/img/brand/sygnet.svg";


const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedOut: false
    };
  }

  Logout = e => {
    e.preventDefault();
    const cookies = new Cookies();
    const notyf = new Notyf();

    httpGet({
      url: "api/auth/logout"
    })
      .then(response => {
        if (response.status === 200) {
          cookies.remove("access_token");
          cookies.remove("refresh_token");
          notyf.success("Вы вышли из системы");
          this.setState({loggedOut: true});
        }
      })
      .catch(error => {
        console.log(error);
        notyf.error("Ошибка");
      });
  };

  render() {
    if (this.state.loggedOut) {
      return <Redirect to="/login"/>;
    }
    // eslint-disable-next-line
    const {children, ...attributes} = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <AppNavbarBrand
          full={{src: logo, width: 104, height: 52, alt: "Printershop Logo"}}
          minimized={{
            src: sygnet,
            width: 30,
            height: 30,
            alt: "Printershop Logo"
          }}
        />

        <AppSidebarToggler className="d-md-down-none" display="lg"/>

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link">
              Главная
            </NavLink>
          </NavItem>
        </Nav>


        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            {/*<NavLink to="#" className="nav-link">*/}
            {/*  <i className="icon-bell"></i>*/}
            {/*  <Badge pill color="danger">*/}
            {/*    5*/}
            {/*  </Badge>*/}
            {/*</NavLink>*/}
          </NavItem>
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <h4 className="mr-3 mt-1" style={{border: '2px solid #ccc', padding: '8px 10px', borderRadius: '100%'}}>
                <i className="icon-user"></i>
              </h4>
              {/*<img*/}
              {/*  src={"../../assets/img/avatars/6.jpg"}*/}
              {/*  className="img-avatar"*/}
              {/*  alt="admin@bootstrapmaster.com"*/}
              {/*/>*/}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center">
                <strong>Аккаунт</strong>
              </DropdownItem>
              <DropdownItem>
                <NavLink to="/personal" className="nav-link">
                  <i className="fa fa-user"></i> Личный кабинет
                </NavLink>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-user"></i> Профиль
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-wrench"></i> Обновить Профиль
              </DropdownItem>
              <DropdownItem divider/>
              <DropdownItem onClick={this.Logout}>
                <i className="fa fa-lock"></i> Выйти
              </DropdownItem>
              {/* <DropdownItem><i className="fa fa-bell-o"></i> Заказы<Badge color="info">42</Badge></DropdownItem> */}
              {/* <DropdownItem><i className="fa fa-envelope-o"></i> Сообщение<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Задания<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Комменты<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem> */}
              {/* <DropdownItem><i className="fa fa-usd"></i> Платежи<Badge color="secondary">42</Badge></DropdownItem> */}
              {/* <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem> */}
              {/* <DropdownItem><i className="fa fa-shield"></i> Заблокировать Аккаунт</DropdownItem> */}
            </DropdownMenu>

          </UncontrolledDropdown>
        </Nav>

        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
