import React, { Component } from 'react';
import { Link } from 'react-router';

class MainNav extends Component {

  componentWillMount() {
    this.props.getLocation();
  }

  render() {
    return (
      <main>
        {React.cloneElement(this.props.children, this.props)}
        <nav>
          <Link to="/"> Home </Link>
          <Link to="/posts" onClick={this.props.fetchPosts.bind(null, this.props.location[0])}> | Search Near Me | </Link>
          <Link to="/new"> Add New Artwork </Link>
        </nav>
      </main>
    );
  }
}

export default MainNav;