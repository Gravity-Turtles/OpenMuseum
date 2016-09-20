import React, { Component } from 'react';

export default class FrontPage extends Component {

  componentWillMount() {
    this.props.getLocation();
  }

  render() {
    return (
      <main>
        <h1>OPEN</h1>
        <h1>MUSEUM</h1>
        <h2>NYC</h2>

        <div className="theme">
        <div>graffiti</div>
        <div>mosaic</div>
        <div>Sculpture</div>
        </div>
      </main>
    );
  }
}
