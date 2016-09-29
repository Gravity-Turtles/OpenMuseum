import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './header';

class MainNav extends Component {

  componentWillMount() {
    this.props.getLocation();
  }

  showSearchBtn() {
    if (!this.props.location.latitude) {
      return (<div> ( . . . ) </div>);
    }
    console.log("yeahhhhh baby show me those props: ", this.props);
    return (
      <Link to="/posts" onClick={this.props.fetchPosts.bind(null, this.props.location)}>
       ( Search Near Me ) 
      </Link>
    );
  }

  render() {
    return (
      <main>
        <div><Header /></div>
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