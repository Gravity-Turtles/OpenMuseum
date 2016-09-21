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

      let zoom = 4;
      let lat = 40.74627;
      let lng = -73.98825;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
    }
  }
};
