import React, { Component } from 'react';
import SearchBox from './searchBox'

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
        <SearchBox getGeoFromSearch={this.props.getGeoFromSearch} fetchPostsFromSearch={this.props.fetchPostsFromSearch}/>
        <div className="theme">
          <div>graffiti</div>
          <div>mosaic</div>
          <div>Sculpture</div>
        </div>
      </main>
    );
  }
}
