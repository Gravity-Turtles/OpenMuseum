import React, { Component } from 'react';
import image from '../assets/person.png';

export default class googleMap extends Component {

  shouldComponentUpdate() {
    return false;
  }
  
  componentDidMount() {
    console.log("props Of googleMapPage",this.props);
    this.myLatLng = {lat: this.props.lat, lng: this.props.lng};
    this.myIcon = image;
    // prevent person icon to appear on the postDetail map
    if (this.props.location.latitude.toFixed(4) !== this.props.lat.toFixed(4) ||
        this.props.location.longitude.toFixed(4) !== this.props.lng.toFixed(4)) {
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
    this.addMarker = function(location, title) {
      let marker = new google.maps.Marker({
        position: location,
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: title
      });
      // this.markers.push(marker);
    }
    if (this.props.posts){
      for (let i = 0; i < this.props.posts.length; i++) {
        let post = this.props.posts[i];
        let location = {lat: post.locLat, lng: post.locLong};
        console.log(location);
        let title = post.title; 
        this.addMarker(location, title);
      }
    }
  }

  render() {
    return (
        <div id="map" ref="map" />
    );
  }
}
