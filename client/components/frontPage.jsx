import React, { Component } from 'react';
import axios from 'axios';

export default class FrontPage extends Component {

  renderCityName() {
    this.address;
    console.log(this.props);
    this.GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.props.location.latitude + '%2C' + this.props.location.longitude + '&key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';
    axios.get(this.GEOCODING)
    .then(({data}) => {
      if (!this.address) {
        return "loading";
      } else {
        console.log("HERE",this.address);
        return "here";
      }
    })
    .catch("no City address info");
    
  }



  render() {
    return (
      <main>
        <h1>OPEN</h1>
        <h1>MUSEUM</h1>
        <h2>NYC</h2>
        <h2>{this.renderCityName()}</h2>
        <div className="theme">
        <div>graffiti</div>
        <div>mosaic</div>
        <div>Sculpture</div>
        </div>
      </main>
    );
  }
}
