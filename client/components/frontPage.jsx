import React, { Component } from 'react';

export default class FrontPage extends Component {

  renderCityName() {
    console.log('inside renderCityName',this.props.location.latitude);
    if (this.props.location.latitude) {
     this.props.getCityName(this.props.location); 
     return this.props.cityName;  
    }  
    return this.props.cityName;
  }

  render() {
    return (
      <main>
        <h1>OPEN</h1>
        <h1>MUSEUM</h1>
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
