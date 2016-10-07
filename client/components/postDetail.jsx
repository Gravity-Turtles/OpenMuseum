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

    return (
      <main>
        <h1>{this.props.posts[i].title}</h1>        
        <div style={{width:'100%', height:'350px'}}>
          <div style={{height:'100%'}}>
            <GoogleMap lat={this.props.posts[i].locLat} lng={this.props.posts[i].locLong} loc={this.props.loc} zoomSize={16} />
          </div>
        </div>        
        <ImageSlide props={this.props.posts[i]}/>
        
        <h1>{this.props.posts[i].title}</h1>

        <div className="social-share-container">
          <div className="social-network">
            <FacebookShareButton
              url={shareUrl}
              title={title}
              className="social-share-button">
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <FacebookShareCount
              url={shareUrl}
              className="social-share-count">
              {count => count}
            </FacebookShareCount>
          </div>

          <div className="social-network">
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="social-share-button">
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <div className="social-share-count">
            &nbsp;
          </div>
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

          <PinterestShareCount url={String(window.location)}
            className="social-share-count" />
        </div>

        <div className="social-network">
          <GooglePlusShareButton
            url={shareUrl}
            className="social-share-button">
            <GooglePlusIcon size={32} round />
          </GooglePlusShareButton>

          <GooglePlusShareCount
            url={shareUrl}
            className="social-share-count">
            {count => count}
          </GooglePlusShareCount>
        </div>

        <div className="social-network">
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            windowWidth={750}
            windowHeight={600}
            className="social-share-button">
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <LinkedinShareCount
            url={shareUrl}
            className="social-share-count">
            {count => count}
          </LinkedinShareCount>
        </div>

        
        <div className="social-network">
          <VKShareButton
            url={shareUrl}
            windowWidth={660}
            windowHeight={460}
            className="social-share-button">
            <VKIcon size={32} round />
          </VKShareButton>

          <div className="social-share-count">
            &nbsp;
          </div>
        </div>
      </div>

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

      <div>
        <myDropzone />
      </div>

      <CommentBox props={this.props}/>
      <CommentList />

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