import React, { Component } from 'react';

export default class PostDetail extends Component {
  render() {
    const i = this.props.posts.findIndex((post) => post._id === this.props.params.id);
    console.log(i);
    return (
      <main>
        <h1>{this.props.posts[i].title}</h1>
        <div>Images here</div>
        <div>{this.props.posts[i].description}</div>
        <div>{this.props.posts[i].locLat} {this.props.posts[i].locLong}</div>

      </main>
    );
  }
}
