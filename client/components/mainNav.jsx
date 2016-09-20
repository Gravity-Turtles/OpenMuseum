import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {

  componentWillMount() {
    this.props.getLocation();
  }

  render() {
    return (
      <main>
        {React.cloneElement(this.props.children, this.props)}
        <nav>
          <Link to="/"> Home </Link>
          <Link to="/posts" onClick={this.props.fetchPosts}> | Search Near Me | </Link>
          <Link to="/posts/new"> Add New Artwork </Link>
        </nav>
      </main>
    );
  }
}

export default App;