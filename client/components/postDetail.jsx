import React, { Component } from 'react';
import GoogleMap from './googleMap';
import jquery from 'jquery';
import { Bootstrap } from 'react-bootstrap';
import { Button, Modal, showModal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import MyModal from './modal';

//*******TEMP
var requireContext = require.context("../../uploads", true, /^\.\/.*\.jpg$/);
var test = requireContext.keys().map(requireContext);

import image from '../../uploads/1475180255072.jpg';

// var imageProps = ["./1475180255072.jpg","./1475180794847.jpg"]
var imageProps = ["./1475180255072.jpg"]

var test2 = imageProps.map(requireContext);
//*******TEMP


export default class PostDetail extends Component {
    constructor(props){
     super(props)
    this.state = {
      showModal: false,
      newName: '',
      newDescription: '',
    };

    this.getInitialState = this.getInitialState.bind(this)
    this.close = this.close.bind(this)
    this.open = this.open.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.onSubmission = this.onSubmission.bind(this);
  }

    getInitialState() {
    return { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

   handleNameChange(e) {
    this.setState({ newName: e.target.value});
    console.log("mah state: ", this.state);
  }

  handleDescriptionChange(e) {
    this.setState({ newDescription: e.target.value });
    console.log("mah state: ", this.state);
  }

  onSubmission(){
    event.preventDefault()
    let payload = this.state;
    console.log("meee payload", payload);
    this.props.editArt(payload);

  }


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
            <GoogleMap lat={this.props.posts[i].locLat} lng={this.props.posts[i].locLong} location={this.props.location}/>
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
