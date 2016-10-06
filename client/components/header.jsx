import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { clearError, facebookAuthReq } from '../actions/actionCreators'

class Header extends Component {

  renderLinks() {
    if (this.props.authenticated) {
      return <li className="nav-item">
        <Link className="nav-link" to="/signout">Sign Out</Link>
      </li>
    } else {
      return (
        <div>
          <Link className="nav-link" to="/signin">Sign In</Link>
           &nbsp;|&nbsp;<Link className="nav-link" to="/signup" onClick={this.props.clearError}>Sign Up</Link>
           &nbsp;|&nbsp;<Link className="nav-link" onClick={this.props.facebookAuthReq}>Login with Facebook</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="nav navbar-nav">
          {this.renderLinks()}
        </div>
      </nav>
    );
  }

}




function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, { clearError, facebookAuthReq })(Header);

