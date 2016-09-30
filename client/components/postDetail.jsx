import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actionCreators';
import GoogleMap from './googleMap';
import jquery from 'jquery';
import { Bootstrap } from 'react-bootstrap';
import { Button, Modal, showModal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import MyModal from './modal';

class PostDetail extends Component {

  render() {
    console.log('FRONT PAGE'); 
    console.log(requireContext.keys());
    console.log(test)
    console.log(test2)    
    // console.log(image);


    
    const i = this.props.posts.findIndex((post) => post._id === this.props.params.id);
    console.log("post index", i)
    console.log('props object: ')
    console.log(this.props.posts[i]);
    console.log(this.props.posts);

    //create array of images
    let imageCollection;
    if(this.props.posts[i].images){
      imageCollection = this.props.posts[i].images.map((item) => {
        return `/../../${item}`
        })
    }

    console.log('imageCollection');
    console.log(imageCollection);
    console.log(imageCollection[0]);

    return (
      <main>
        <div style={{width:'100%', height:'350px'}}>
          <div style={{height:'100%'}}>
            <GoogleMap lat={this.props.posts[i].locLat} lng={this.props.posts[i].locLong} loc={this.props.loc}/>
          </div>
        </div>
        <h1>{this.props.posts[i].title}</h1>
        <div>Images here</div>

        <div><img src = {imageCollection[0]}/> </div>        

        <div><img src = '/../../uploads/1475187584213.jpg'/> </div>   
        <div>{this.props.posts[i].description}</div>

      <div>
        <MyModal props={this.props}/>
      </div>

      </main>
    );
  }
}


function mapStateToProps(state){
  return { 
    loc: state.loc,
    posts: state.posts
   };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

