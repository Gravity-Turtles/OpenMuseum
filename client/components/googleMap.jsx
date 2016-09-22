import React, { Component } from 'react';

export default class googleMap extends Component {

  shouldComponentUpdate() {
    return false;
  }
  
  componentDidMount() {
    console.log(this.props.lat, this.props.lng);
    this.map = new google.maps.Map(this.refs.map, {
      center: {lat: this.props.lat, lng: this.props.lng},
      zoom: 15
    });
  }

  render() {
    return (
        <div id="map" ref="map" />
    );
  }
}
