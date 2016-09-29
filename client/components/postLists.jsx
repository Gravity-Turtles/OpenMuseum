import React, { Component } from 'react';
import { Link } from 'react-router';
import GoogleMap from './googleMap';

export default class PostLists extends Component {

  renderPost() {
    if(this.props.posts === undefined) {
      return <div>loading</div>;
    }
    return this.props.posts.map((post) => {
      return ( 
        <li key={post._id}>
          <Link to={"posts/" + post._id}>
            <strong>{post.title}</strong>
            {post.description} {post.locLat} {post.locLong}
          </Link>
        </li>
      );
    });
  }

  renderMap() {
    if (!this.props.location.latitude) {
      return (
        <div> loading...</div>
      );
    }
    console.log("length of posts", this.props.posts.length);
    if (this.props.posts.length) {
      console.log("something around you");
      return (
        <div style={{height:'100%'}}>
          <GoogleMap lat={this.props.location.latitude} lng={this.props.location.longitude} {...this.props}/>
        </div>
      );
    } else {

      console.log("nothing around you");
      
      return (<div> Nothing around you. </div>);
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