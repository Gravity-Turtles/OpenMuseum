import React, { Component } from 'react';

export default class extends Component {
  shouldComponentUpdate(){
    return false;
  }

  // receives this info from the app.js file
  componentWillReceiveProps(nextProps){
    this.map.panTo({ lat: nextProps.lat, lng: nextProps.lng })
  }

  componentDidMount(){
    this.map = new google.maps.Map(this.refs.map, {
      center: { lat: this.props.lat, lng: this.props.lng },
      zoom: 4
    });
  }

  render(){
    return (
      <div id="map" ref="map" />
    );
  }
}

// this code belongs in the app.js in Grider's example
// to render the map to the page
/*
import React, { Component } from 'react';
import GoogleMap from './google_map';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {lat: 40.74627, lng= -73.98825}
  }

  render(){
    return (
      <div style={{height: '100%'}}>
        Map me!
        <button onClick={() => this.setState({ lat: 40.7128, lng: -74.0059})}>
        New York
        </button>
        <GoogleMap  lat={this.state.let} lng={this.state.lng}/>
      </div>
    );
  }
}
*/