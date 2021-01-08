import React, {Component} from 'react';
import { 
  Col, 
  Row
} from 'reactstrap';

import CardInfo from './components/CardInfo'
import CardOrder from './components/CardOrder'
import CardAdress from './components/CardAdress'



class UserCard extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="6">
            <CardInfo id={this.props.match.params.id}/>
          </Col>
          <Col md="6">
            <CardAdress id={this.props.match.params.id} />
          </Col>
          <Col>
            <CardOrder id={this.props.match.params.id} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default UserCard;
