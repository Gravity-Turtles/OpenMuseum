import React, { Component } from 'react';
import googleMap from './googleMap';

export default class googleMapWrapper extends Component {

  render() {
    return (
      <div style={{height:'100%'}}>
        <googleMap lat={40.7128} lng={-74.0005} />        
      </div>
    );
  }
}
