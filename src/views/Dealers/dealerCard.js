import React, {Component} from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane,} from 'reactstrap';

import DealerInfo from './components/dealerInfo'
import DealerShops from './components/dealershop'
import { httpGet } from "../../api";


class DealerCard extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
        user: [],
      activeTab: new Array(4).fill('1'),
    };
  }

  
  componentWillMount() {
    if (this.props.location.dealer_id !== undefined) {
      localStorage.setItem("dealer_id", this.props.location.dealer_id);
    }
  }

  componentDidMount(){

    httpGet({ 
      url: "api/admin/dealer",
      params: {
       user_id: localStorage.getItem('dealer_id')
      }
    })
    .then(response => { 
      this.setState({
      user: response.data.data
     })
    })
    .catch(error => {
      console.log(error);
    });
  }

 

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1"> 
          {<DealerInfo dealerData = {this.state.user}/>}
        </TabPane>
        <TabPane tabId="8">
          {<DealerShops dealerData = {this.state.user} />} 
        </TabPane>
      </>
    );
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" className="mb-12">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}
                >
                Главная Информация 
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '8'}
                  onClick={() => { this.toggle(0, '8'); }}
                >
                Магазины
                </NavLink>
              </NavItem>
              
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </Col>
          
        </Row>
      </div>
    );
  }
}

export default DealerCard;
