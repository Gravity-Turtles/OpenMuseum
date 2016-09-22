import React, { Component } from 'react';

export default class PostDetail extends Component {
  render() {
    return (
      <main>
        <h1>{this.props.params.id}</h1>
        <div>Image here</div>
        <div>Detail here</div>
        <div>comments here</div>
      </main>
    );
  }
}
