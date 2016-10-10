import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { clearError, facebookAuthReq } from '../actions/actionCreators'

class Header extends Component {

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div className="headerBtns">
          <Link className="headerBtn" to="/signout">Sign Out</Link>
        </div>
      )
    } else {
      return (
        <div className="headerBtns">
          <div className="headerBtn"><Link to="/signin">Sign In</Link></div>
          <div className="headerBtn"><Link to="/signup" onClick={this.props.clearError}>Sign Up</Link></div>
          <div className="headerBtn hide"><Link onClick={this.props.facebookAuthReq}>Login with Facebook</Link></div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="headerBar">
        <div className="headerTitle"><Link to="/">OPEN MUSEUM</Link></div>
        {this.renderLinks()}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, { clearError, facebookAuthReq })(Header);

