import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actionCreators';
import GoogleMap from './googleMap';

class PostLists extends Component {

  renderPost() {
    if(this.props.posts === undefined) {
      return <div>loading</div>;
    }
    return this.props.posts.map((post) => {
      return ( 
        <li key={post._id}>
          <Link to={"posts/" + post._id}>
            <strong>{post.title}</strong><br/>
            {post.description}
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
    console.log("length of posts", this.props.posts.length);
    if (this.props.posts.length) {
      console.log("something around you");
      return (
        <div style={{height:'100%'}}>
          <GoogleMap lat={this.props.loc.latitude} lng={this.props.loc.longitude} {...this.props}/>
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
        <div style={{width:'100%', height:'350px'}}>
          {this.renderMap()}
        </div>
        <ol className="postLists">
          {this.renderPost()}
        </ol>
        
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

export default connect(mapStateToProps, mapDispatchToProps)(PostLists);
