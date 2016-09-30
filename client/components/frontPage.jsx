import React, { Component } from 'react';
import SearchBox from './searchBox'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actionCreators';


//*******TEMP
var requireContext = require.context("../../uploads", true, /^\.\/.*\.jpg$/);
var test = requireContext.keys().map(requireContext);

import image from '../../uploads/1475180255072.jpg';

var imageProps = ["./1475180255072.jpg","./1475180794847.jpg"]
// var imageProps = ["./1475180255072.jpg"]

var test2 = imageProps.map(requireContext);



//*******TEMP


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
        <SearchBox getGeoFromSearch={this.props.getGeoFromSearch} fetchPostsFromSearch={this.props.fetchPostsFromSearch}/>
        <div className="theme">
          <div>graffiti</div>
          <div>mosaic</div>
          <div>Sculpture</div>    

          <div><img src = {test2[0]}/> </div>


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
