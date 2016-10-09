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
        <Link to="/posts" onClick={this.props.fetchPosts.bind(null, this.props.loc, "")}>
        SEARCH NEAR ME
        </Link>
    );
  }

  render() {
    return (
      <main>
        <div><Header /></div>
        <div className="childPage">{this.props.children}</div>
        <nav className="mainNav">
          <div className="sideBtn home"><Link to="/">LOBBY</Link></div>
          <div className="mainBtn">{this.showSearchBtn()}</div>
          <div className="sideBtn addNew"><Link to="/new">ADD NEW ART</Link></div>
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