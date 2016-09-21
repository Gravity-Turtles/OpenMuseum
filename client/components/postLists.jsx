import React, { Component } from 'react';
import { Link } from 'react-router';

export default class PostLists extends Component {

  renderPost() {
    if(this.props.posts[0] === undefined) {
      return <div>loading</div>;
    }
    return this.props.posts[0].map((post) => {
      return ( 
        <div key={post.title}>
          <strong>{post.title}</strong>
          {post.description} {post.locLat} {post.locLong}
        </div>
      );
    });
  }

  render() {
    return (
      <main>
        <h1>ArtMap</h1>
        <div>
          {this.renderPost()}
        </div>
        
      </main>
    );
  }
}
