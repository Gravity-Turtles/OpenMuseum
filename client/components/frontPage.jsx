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
     return this.props.cityName;  
    }  
    return this.props.cityName;
  }

  renderThemeBtns() {
    if (this.props.loc.latitude) {
      return (
        <div className="theme">
          <div className="themeRow">
              <Link className="themeBtnLink" to="/postsfromtheme" onClick={this.props.fetchPosts.bind(null, this.props.loc, "StreetArts")}>
                <div className="themeBtn">StreetArts</div></Link>
              <Link className="themeBtnLink" to="/postsfromtheme" onClick={this.props.fetchPosts.bind(null, this.props.loc, "Sclupture")}>
                <div className="themeBtn">Sclupture</div></Link>
              <Link className="themeBtnLink" to="/postsfromtheme" onClick={this.props.fetchPosts.bind(null, this.props.loc, "Architecture")}>
                <div className="themeBtn">Architecture</div></Link>
            </div>
            <div className="themeRow">
              <Link className="themeBtnLink" to="/postsfromtheme" onClick={this.props.fetchPosts.bind(null, this.props.loc, "Mosaic")}>
                <div className="themeBtn">Mosaic</div></Link> 
              <Link className="themeBtnLink" to="/postsfromtheme" onClick={this.props.fetchPosts.bind(null, this.props.loc, "Trending")}>
                <div className="themeBtn">Trending</div></Link> 
              <Link className="themeBtnLink" to="/postsfromtheme" onClick={this.props.fetchPosts.bind(null, this.props.loc, "Historic")}>
                <div className="themeBtn">Historic</div></Link> 
            </div>
          </div>
      );
    }
    return "";
  }

  render() {    
    console.log('inside render ', this.props)

    return (
      <main>
        <h1>OPEN</h1>
        <h1>MUSEUM</h1>
        <h2>{this.renderCityName()}</h2>
        <SearchBox fetchPostsFromSearch={this.props.fetchPostsFromSearch}/>
        {this.renderThemeBtns()}
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
