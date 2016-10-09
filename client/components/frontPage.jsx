import React, { Component } from 'react';
import SearchBox from './searchBox'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actionCreators';

class FrontPage extends Component {

  renderCityName() {
    console.log('inside renderCityName',this.props);
    if (this.props.loc.latitude) {
     this.props.getCityName(this.props.loc); 
     return this.props.cityName.toUpperCase();  
    }  
    return this.props.cityName.toUpperCase();
  }

  renderThemeBtns() {
    if (this.props.loc.latitude) {
      return (
        <ul className="theme">
          <li>
            <Link className="themeBtnLink" to="/postsfromtheme" onClick={this.props.fetchPosts.bind(null, this.props.loc, "StreetArt")}>
              <div className="themeBtn">Street Art</div>
            </Link>
          </li>
          <li>
            <Link className="themeBtnLink" to="/postsfromtheme" onClick={this.props.fetchPosts.bind(null, this.props.loc, "Sculpture")}>
              <div className="themeBtn">Sculptures</div>
            </Link>
          </li>
          <li>
            <Link className="themeBtnLink" to="/postsfromtheme" onClick={this.props.fetchPosts.bind(null, this.props.loc, "Architecture")}>
              <div className="themeBtn">Architecture / Signs</div>
            </Link>
          </li>
          <li>
            <Link className="themeBtnLink" to="/postsfromtheme" onClick={this.props.fetchPosts.bind(null, this.props.loc, "Mosaic")}>
              <div className="themeBtn">Mosaics</div>
            </Link> 
          </li>
          <li>
            <Link className="themeBtnLink" to="/postsfromtheme" onClick={this.props.fetchPosts.bind(null, this.props.loc, "Historic")}>
              <div className="themeBtn">Historic Places</div>
            </Link> 
          </li>
          <li>
            <Link className="themeBtnLink" to="/postsfromtheme" onClick={this.props.fetchPosts.bind(null, this.props.loc, "Trending")}>
              <div className="themeBtn">Trending</div>
            </Link> 
          </li>
        </ul>
      );
    }
    return "";
  }

  render() {        
    return (
      <main className="oneColPageWrapper">
        <h1 className="mainTitle">OPEN MUSEUM</h1>
        <h1 className="cityNameTitle">{this.renderCityName()}</h1>
        <SearchBox fetchPostsFromSearch={this.props.fetchPostsFromSearch}/>
        <div className="themeBox">{this.renderThemeBtns()}</div>
      </main>
    );
  }
}

function mapStateToProps(state){
  return { 
    loc: state.loc,
    cityName: state.cityName
   };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);
