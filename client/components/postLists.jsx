import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actionCreators';
import GoogleMap from './googleMap';

class PostLists extends Component {

  componentWillMount() {
    this.props.fetchPosts(this.props.loc, "");
  }
  
  renderPost() {
    if(this.props.posts === undefined) {
      return <div>loading</div>;
    }
    return this.props.posts.map((post) => {
      let thumbPic;
      if(post.images[0]) thumbPic = `/${post.images[0]}`
      else thumbPic = '/uploads/default.jpg'            
          
      return ( 
        <li className="clearf" key={post._id}>
          <Link to={"posts/" + post._id}>
            <div className="thumbNail"><img className="thumbImg" src= {thumbPic} /></div>
            <div className="listContents">
              <div className="listTitle">{post.title}</div>
              <div className="listText">{post.description.split(" ").slice(0, 9).join(" ") + "..."}</div>
            </div>
          </Link>
        </li>
      );
    });
  }

  renderMap() {
    if (!this.props.loc.latitude) {
      return (
        <div> loading...</div>
      );
    }
    console.log("length of posts", this.props.postsCurrent.length);
    if (this.props.postsCurrent.length) {
      console.log("something around you");
      return (
        <div style={{height:'100%'}}>
          <GoogleMap lat={this.props.loc.latitude} lng={this.props.loc.longitude} zoomSize={15} {...this.props}/>
        </div>
      );
    } else {

      console.log("nothing around you");
      
      return (<div> No results for your search. </div>);
    }
  }


  render() {
    return (
      <main>
        <h2 className="pageTitle">Near You</h2>
        <div className="gMap">
          {this.renderMap()}
        </div>
        <ol className="postLists custumNum">
          {this.renderPost()}
        </ol>
        
      </main>
    );
  }
}

function mapStateToProps(state){
  return { 
    loc: state.loc,
    posts: state.posts,
    postsCurrent: state.postsCurrent
   };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostLists);
