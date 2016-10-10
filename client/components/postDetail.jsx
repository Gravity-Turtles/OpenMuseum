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
import myDropzone from './dropzone';


import CommentBox from './commentBox';
import CommentList from './commentList';

class PostDetail extends Component {

    constructor(props){
    super(props)
    const i = this.props.posts.findIndex((post) => post._id === this.props.params.id);
    this.state = {
      title: this.props.posts[i].title,
      likes: this.props.posts[i].likes,
      incremented: false
    }
    
     // this.getInitialState = this.getInitialState.bind(this);
     this.toggle = this.toggle.bind(this);
  }

  componentDidMount(){
    this.props.getComments(this.props.params.id)
    
  }

  toggle(){
    // const i = this.props.posts.findIndex((post) => post._id === this.props.params.id);
    // console.log("post index", i);
    // var likes = this.props.posts[i].likes;
   
    var currentLikes = this.state.likes;

    if(this.state.incremented === false){
      currentLikes++;
      this.setState({ likes: currentLikes, incremented : true}, function(){
          let payload = this.state;
          this.props.editLikes(payload)

      })
      
      
    } else {
      currentLikes--;
      this.setState({likes: currentLikes, incremented :false}, function(){
        let payload = this.state;
        this.props.editLikes(payload)
      });
    }   
  }


  render() {
    ////*** TEMP *****///// 
    console.log('this.props:', this.props);

    const i = this.props.posts.findIndex((post) => post._id === this.props.params.id);
    var likes = this.props.posts[i].likes;

    var increment = function(){
      likes++;
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

    let shareUrl = document.location.href;
    let title = document.title;
    let exampleImage = this.props.posts[i];


    // Date converter //
    let a = new Date(Number(this.props.posts[i].date));
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    // let hour = a.getHours();
    // let min = a.getMinutes();
    // let sec = a.getSeconds();
    let time = month + '.' + date + '.' + year;

    return (
      <div className="twoColPage">
        <div className="imageSlide">
          <ImageSlide props={this.props.posts[i]}/>
        </div>

        <div className="details">  

          <div className="detailBox">
            <h2 className="pageTitle">{this.props.posts[i].title}</h2>
            <p>{this.props.posts[i].description}</p>
            <div><strong>Artist: </strong>{this.props.posts[i].artist}</div>
            <div><strong>Post Date: </strong>{time}</div>
            <div><strong>Categories: </strong>{this.props.posts[i].categories.join(', ')}</div>
            <div><strong>Address: </strong>{this.props.posts[i].address}</div>

          <div className="editBtn">
            <MyModal props={this.props}/>
          </div>

          <div>
            <myDropzone />
          </div>

        </div>

        <div className="gMapSmall">
          <div style={{height:'100%'}}>
            <GoogleMap lat={this.props.posts[i].locLat} lng={this.props.posts[i].locLong} loc={this.props.loc} zoomSize={16} />
          </div>
        </div>  

      </div>
      <div className="social-share-container">
        <div className="likeBtn">
          <span className="likesNum">{this.state.likes} </span>
          <Button
            bsStyle="primary"
            bsSize="small"
            onClick={this.toggle}>
            : )
          </Button>
        </div>

        <div className="social-network">
          <FacebookShareButton
            url={shareUrl}
            title={title}
            className="social-share-button">
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>

        <div className="social-network">
        <TwitterShareButton
          url={shareUrl}
          title={title}
          className="social-share-button">
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        </div>

        <div className="social-network">
          <PinterestShareButton
            url={String(window.location)}
            media={`${String(window.location)}/${exampleImage}`}
            windowWidth={1000}
            windowHeight={730}
            className="social-share-button">
            <PinterestIcon size={32} round />
          </PinterestShareButton>
        </div>

        <div className="social-network">
          <GooglePlusShareButton
            url={shareUrl}
            className="social-share-button">
            <GooglePlusIcon size={32} round />
          </GooglePlusShareButton>
        </div>
      </div>
      <CommentBox className="commentBox" props={this.props}/>
      <CommentList />

    </div>
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