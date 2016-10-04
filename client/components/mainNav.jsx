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
    if (!this.props.loc.latitude) {
      return (<div className="navRow">. . .</div>);
    }
    return (
      <Link to="/posts" className="navRow" onClick={this.props.fetchPosts.bind(null, this.props.loc)}>Search Near Me
      </Link>
    );
  }

  render() {
    return (
      <main>
        <div><Header /></div>
        {this.props.children}
        <nav className="mainNav">
          <Link to="/" className="navRow">Home</Link>
          <div style={{"float": "left"}}>
            {this.showSearchBtn()}
          </div>
          <Link to="/new" className="navRow">Add New Artwork</Link>
        </nav>
      </main>
    );
  }
}

function mapStateToProps(state){
    return { 
      loc: state.loc,
     }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);