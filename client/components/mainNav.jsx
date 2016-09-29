import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actionCreators';

import Header from './header';

class MainNav extends Component {

  componentWillMount() {
    this.props.getLocation();
  }

  showSearchBtn() {
    if (!this.props.location.latitude) {
      return (<div> ( . . . ) </div>);
    }
    return (
      <Link to="/posts" onClick={this.props.fetchPosts.bind(null, this.props.location)}>
       ( Search Near Me ) 
      </Link>
    );
  }

  render() {
    return (
      <main>
        <div><Header /></div>
        {this.props.children}
        <nav>
          <Link to="/" style={{"float": "left"}}> ( Home ) </Link>
          <div style={{"float": "left"}}>
            {this.showSearchBtn()}
          </div>
          <Link to="/new" style={{"float": "left"}}> ( Add New Artwork ) </Link>
        </nav>
      </main>
    );
  }
}

function mapStateToProps(state){
    return { 
      location: state.location,
     }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapDispatchToProps, mapDispatchToProps)(MainNav);