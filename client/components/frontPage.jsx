import React, { Component } from 'react';
import SearchBox from './searchBox'
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

  render() {    
    console.log('inside render ',this.props)

    //create array of images
    // let imageCollection;
    // if(this.props.posts[i].images){
    //   imageCollection = this.props.posts[i].images.map((item) => {
    //     return `/../../${item}`
    //     })
    // }

    // console.log('imageCollection');
    // console.log(imageCollection);
    // console.log(imageCollection[0]);


    return (
      <main>
        <h1>OPEN</h1>
        <h1>MUSEUM</h1>
        <h2>{this.renderCityName()}</h2>
        <SearchBox fetchPostsFromSearch={this.props.fetchPostsFromSearch}/>
        <div className="theme">
          <div className="themeRow">
            <Link to="/postlistsfromtheme" onClick={this.props.fetchPosts.bind(null, this.props.loc, "Street Art")}>
              <div className="themeBtn">Street Art</div></Link>
            <Link to="/postlistsfromtheme">
              <div className="themeBtn">Sclupture</div></Link>
            <Link to="/postlistsfromtheme">
              <div className="themeBtn">Architecture</div></Link>
          </div>
          <div className="themeRow">
            <Link to="/postlistsfromtheme">
              <div className="themeBtn">Mosaic</div></Link> 
            <Link to="/postlistsfromtheme">
              <div className="themeBtn">Trending</div></Link> 
            <Link to="/postlistsfromtheme">
              <div className="themeBtn">Historic</div></Link> 
          </div>
        </div>
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
