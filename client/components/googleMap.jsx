import React, { Component } from 'react';
import image from '../assets/person.png';
import store from '../store';

export default class googleMap extends Component {

  shouldComponentUpdate() {
    return false;
  }
  
  componentDidMount() {
    console.log("props Of googleMapPage",this.props);
    this.myLatLng = {lat: this.props.lat, lng: this.props.lng};
    this.myIcon = image;
    // prevent person icon to appear on the postDetail map
    if (this.props.loc.latitude.toFixed(3) !== this.props.lat.toFixed(3) ||
        this.props.loc.longitude.toFixed(3) !== this.props.lng.toFixed(3)) {
      this.myIcon = null;
    }

    this.map = new google.maps.Map(this.refs.map, {
      center: this.myLatLng,
      zoom: 15
    });
    this.marker = new google.maps.Marker({
      position: this.myLatLng,
      map: this.map,
      icon: this.myIcon,  
      title: 'You are here.'
    });
    // markers for the art posts nearby 
    // this.markers = [];
    this.addMarker = function(loc, title, n) {
      let marker = new google.maps.Marker({
        position: loc,
        map: this.map,
        animation: google.maps.Animation.DROP,
        label: "" + n,
        title: title
      });
      // this.markers.push(marker);
    }
    if (this.props.posts){
      for (let i = 0; i < this.props.posts.length; i++) {
        let post = this.props.posts[i];
        let loc = {lat: post.locLat, lng: post.locLong};
        console.log("posts locations", this.props.posts.length);
        let title = post.title; 
        this.addMarker(loc, title, i + 1);
      }
    }
  }
  componentDidUpdate() {
    store.dispatch({type: 'FETCH_POSTS', posts: []});
  }
  componentWillUnmount() {
    store.dispatch({type: 'FETCH_POSTS', posts: []});
  }

  render() {
    return (
        <div id="map" ref="map" />
    );
  }
}
