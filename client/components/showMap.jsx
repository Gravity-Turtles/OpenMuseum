// probably don't need this first line bc it will be handled in this line:
// import React, { Component } from 'react';

// instructions from here:
// https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#the-map-container-component


/*
With the stage set for our Container component, let's start our Map component. Our Map component is essentially a simple wrapper around the default Google Maps api. The tricky part about using the asynchronous library is being able to depend upon it's API being available.

Let's build the basic Map component:
*/

// MAP COMPONENT...

// this is the basic component...
// export class Map extends React.Component {
//   render() {
//     return (
//       <div ref='map'>
//         Loading map...
//       </div>
//     )
//   }
// }
// basic component ends
import React, { Component } from 'react';

export class Map extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let {initialCenter, zoom} = this.props;
      const {lat, lng} = this.state.currentLocation;
      this.state = {
        lat: lat,
        lng: lng
      }
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
    }
  }

  Map.propTypes = {
    google: React.PropTypes.object,
    zoom: React.PropTypes.number,
    initialCenter: React.PropTypes.object
  }
  Map.defaultProps = {
    zoom: 4,
    // MKS/Grind Broadway, by default
    // might change this to 6th Ave & Houston
    initialCenter: {
      lat: 40.74627,
      lng: -73.98825
    }
  }
};
