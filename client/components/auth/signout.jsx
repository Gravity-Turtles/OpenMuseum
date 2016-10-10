import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actionCreators';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <div className="oneColPage"><h1 className="mainTitle">Thanks for Visiting.</h1></div>;
  }
}

export default connect(null, actions)(Signout);
