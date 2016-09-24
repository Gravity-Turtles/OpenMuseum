import React, { Component } from 'react';
import { Link } from 'react-router';

class MainNav extends Component {

  componentWillMount() {
    this.props.getLocation();
  }

  showSearchBtn() {
    if (this.props.cityName === '. . .') {
      return (<div> ( . . . ) </div>);
    }
    return (
      <Link to="/posts" onClick={this.props.fetchPosts.bind(null, this.props.location)}>
       ( Search Near Me ) 
      </Link>
    );
  }

  render() {
    return (
      <main>
        {React.cloneElement(this.props.children, this.props)}
        <nav>
          <Link to="/" style={{"float": "left"}}> ( Home ) </Link>
          <div style={{"float": "left"}}>
            {this.showSearchBtn()}
          </div>
          <Link to="/new" style={{"float": "left"}}> ( Add New Artwork ) </Link>
        </nav>
      </main>
    );
  }
}

export default MainNav;