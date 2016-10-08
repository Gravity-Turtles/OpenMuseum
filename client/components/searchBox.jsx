import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import rArrow from '../assets/rArrow.png';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { address: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ address: event.target.value });
  }

  onFormSubmit(event) {
    console.log(this.state.address);
    store.dispatch({type: 'SEARCH_TERM', payload: this.state.address});
    event.preventDefault();
    let GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.address + '&key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';
    let request = axios.get(GEOCODING);

    request.then(({data}) => {
      let geoFromSearch = {}
      console.log("GEO DATA FROM Search=======", data);
      if (data.results[0]) {
        geoFromSearch.latitude = data.results[0].geometry.location.lat;
        geoFromSearch.longitude = data.results[0].geometry.location.lng;
        console.log("GEO DATA FROM Search=======", geoFromSearch);
      }
      else  {
        console.log("Geolocation data not found");
      }
      this.props.fetchPostsFromSearch(geoFromSearch);
    }).catch(console.log("no DATA at GeoFromSearch"));
   
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group searchBox">
        <input 
          placeholder="Search by Address"
          className="form-control frontPage"
          value={this.state.address}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn frontPage btn-secondary"> </button>
          <button type="submit" className="btn btn-secondary"> </button>
        </span>
      </form>
    )
  }
}