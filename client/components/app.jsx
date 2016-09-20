import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {

  componentWillMount() {
    
  }


  render() {
    return (
      <main>
        <div>Search bar here</div>
        <hr/>
        <div>{this.props.children}</div>
        <hr/>
        <div>
          <Link to="/"> Home </Link>
          <Link to="/lists"> | Search Near Me | </Link>
          <Link to="/new"> Add New Artwork </Link>
        </div>
      </main>
    );
  }
}
