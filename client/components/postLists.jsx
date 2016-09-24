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
        <div key={post.title}>
          <Link to={"posts/" + post._id}>
            <strong>{post.title}</strong>
            {post.description} {post.locLat} {post.locLong}
          </Link>
        </div>
      );
    });
  }

  renderMap() {
    if (!this.props.location.latitude) {
      return (
        <div> loading...</div>
      );
    }
    return (
      <div style={{height:'100%'}}>
        <GoogleMap lat={this.props.location.latitude} lng={this.props.location.longitude} {...this.props}/>
      </div>
    );
  }


  render() {
    return (
      <main>

        <div>
          {this.renderPost()}
        </div>
        

        <div id="map"></div>
        <div>list here</div>
        <div><Link to="/posts/id">Art 1</Link></div>
        <div><Link to="/posts/id">Art 2</Link></div>

      </main>

    );
  }
}