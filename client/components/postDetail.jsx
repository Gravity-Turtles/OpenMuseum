import React, { Component } from 'react';
import GoogleMap from './googleMap';

export default class PostDetail extends Component {
  render() {
    const i = this.props.posts.findIndex((post) => post._id === this.props.params.id);
    console.log(i);
    return (
      <main>
        <div style={{width:'100%', height:'300px'}}>
          <div style={{height:'100%'}}>
            <GoogleMap lat={this.props.posts[i].locLat} lng={this.props.posts[i].locLong}/>
          </div>
        </div>
        <h1>{this.props.posts[i].title}</h1>
        <div>Images here</div>
        <div>{this.props.posts[i].description}</div>

      </main>
    );
  }
}
