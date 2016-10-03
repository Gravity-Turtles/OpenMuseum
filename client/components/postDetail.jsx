import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actionCreators';
import GoogleMap from './googleMap';
import jquery from 'jquery';
import { Bootstrap } from 'react-bootstrap';
import { Button, Modal, showModal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import MyModal from './modal';
import ImageSlide from '../components/imageSlide';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';

class PostDetail extends Component {

    constructor(props){
    super(props)
    const i = this.props.posts.findIndex((post) => post._id === this.props.params.id);
    console.log("impoooooooortant: ", i);
    this.state = {
      title: this.props.posts[i].title,
      likes: this.props.posts[i].likes,
      incremented: false
    }
    console.log('++++++this.props.posts[i].likes', this.props.posts[i].likes, "state:", this.state)
    
     // this.getInitialState = this.getInitialState.bind(this);
     this.toggle = this.toggle.bind(this);
  }

  toggle(){
    // const i = this.props.posts.findIndex((post) => post._id === this.props.params.id);
    // console.log("post index", i);
    // var likes = this.props.posts[i].likes;
   
    var currentLikes = this.state.likes;
    console.log("current hiu props and hiu likes: ", this.props, currentLikes)

    if(this.state.incremented === false){
      console.log("currentLikes: ", currentLikes)
      currentLikes++;
      console.log("++CUURRRRent LIkes: ", currentLikes);
      this.setState({ likes: currentLikes, incremented : true}, function(){
          let payload = this.state;
          console.log("++likes: ", this.state.likes, "++payload: ", payload);
          this.props.editLikes(payload)

      })
      
      
    } else {
      currentLikes--;
      this.setState({likes: currentLikes, incremented :false}, function(){
        let payload = this.state;
        console.log("--likes: ", this.state.likes, "--payload: ", payload);
        this.props.editLikes(payload)
      });
    }   
  }


  render() {
    const i = this.props.posts.findIndex((post) => post._id === this.props.params.id);
    console.log("post index", i);
    var likes = this.props.posts[i].likes;

    var increment = function(){
      likes++;
      console.log('hey likes: ', likes);
    }



const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton 
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount 
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const VKIcon = generateShareIcon('vk');


    return (
      <main>
        <h1>{this.props.posts[i].title}</h1>        
        <div style={{width:'100%', height:'350px'}}>
          <div style={{height:'100%'}}>
            <GoogleMap lat={this.props.posts[i].locLat} lng={this.props.posts[i].locLong} loc={this.props.loc}/>
          </div>
        </div>        
        <ImageSlide props={this.props.posts[i]}/>
        
        <h1>{this.props.posts[i].title}</h1>

        <div>
          FB Share button here
          <FacebookIcon size={32} round={true} />
         

        </div>

        <div>Images here</div>
        <div>{this.props.posts[i].description}</div>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={this.toggle}>
          : )
        </Button>
        <div>{this.state.likes}</div>




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