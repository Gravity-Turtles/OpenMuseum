import React, { Component } from 'react';
import { Link } from 'react-router';

export default class PostLists extends Component {

  renderPost() {
    if(this.props.posts === undefined) {
      return <div>loading</div>;
    }
    return this.props.posts.map((post) => {
      return ( 
        <div key={post.title}>
          <Link to={"posts/" + post._id}>
            <strong>{post.title}</strong>
            {post.description} {post.locLat} {post.locLong}
          </Link>
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
