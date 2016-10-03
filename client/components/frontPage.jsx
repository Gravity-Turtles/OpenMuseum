import React, { Component } from 'react';
import SearchBox from './searchBox'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actionCreators';

class FrontPage extends Component {

  renderCityName() {
    console.log('inside renderCityName',this.props);
    if (this.props.loc.latitude) {
     this.props.getCityName(this.props.loc); 
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

function mapStateToProps(state){
  return { 
    loc: state.loc,
    cityName: state.cityName
   };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);
