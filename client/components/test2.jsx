import React, { Component } from 'react';
import SearchBox from './searchBox'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actionCreators';

import ImageGallery from 'react-image-gallery';

//*******TEMP
var requireContext = require.context("../../uploads", true, /^\.\/.*\.jpg$/);
var test = requireContext.keys().map(requireContext);

import image from '../../uploads/1475180255072.jpg';

var imageProps = ["./1475180255072.jpg","./1475180794847.jpg"]
// var imageProps = ["./1475180255072.jpg"]

var test2 = imageProps.map(requireContext);
//*******TEMP


class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false
    };
  }

  renderCityName() {
    console.log('inside renderCityName',this.props);
    if (this.props.loc.latitude) {
     this.props.getCityName(this.props.loc); 
     return this.props.cityName;  
    }  
    return this.props.cityName;
  }

  handleImageLoad(event) {
    console.log('Image loaded ', event.target)
  }


  render() {    
    console.log('inside render ',this.props)

    const images = [
      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
        originalAlt: 'original-alt',
        thumbnailAlt: 'thumbnail-alt',
        thumbnailLabel: 'Optional',
        description: 'Optional description...',
        srcSet: 'Optional srcset (responsive images src)',
        sizes: '2'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ]

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

        <ImageGallery
          ref={i => this._imageGallery = i}
          items={images}
          slideInterval={2000}
          onImageLoad={this.handleImageLoad}/>

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

export default connect(mapStateToProps, mapDispatchToProps)(Test);