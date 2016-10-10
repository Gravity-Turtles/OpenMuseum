import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actionCreators';
import GoogleMap from './googleMap';
import store from '../store';

class PostListsFromTheme extends Component {

  renderPost() {
    if(this.props.posts === undefined) {
      return <div>loading</div>;
    }
    return this.props.posts.map((post) => {
      let thumbPic;
      if(post.images[0]) thumbPic = `/${post.images[0]}`
      else thumbPic = '/uploads/default.jpg' 
        
      return ( 
        <li className="clearf" key={post._id}>
          <Link to={"posts/" + post._id}>
            <div className="thumbNail" style={{"background-image":"url(" +thumbPic + ")"}}></div>
            <div className="listContents">
              <div className="listTitle">{post.title}</div>
              <div className="listText">{post.description.split(" ").slice(0, 4).join(" ") + "..."}</div>
            </div>
          </Link>
        </li>
      );
    });
  }

  renderMap() {
    if (!this.props.loc.latitude) {
      return (
        <div> loading...</div>
      );
    }
    console.log("length of posts", this.props.postsCurrent.length);
    if (this.props.postsCurrent.length) {
      console.log("something around you");
      return (
        <div style={{height:'100%'}}>
          <GoogleMap lat={this.props.loc.latitude} lng={this.props.loc.longitude} zoomSize={13} {...this.props}/>
        </div>
      );
    } else {

      console.log("nothing around you");
      
      return (<div> No results for your search. </div>);
    }
  }

  render() {
    return (
      <main>
        <div className="gMap">
          <h2 className="pageTitle twoColPage">{this.props.themeTerm} in {this.props.cityName}</h2>
          {this.renderMap()}
        </div>
        <div className="listBox twoColPage">
          <ol className="postLists custumNum">
            {this.renderPost()}
          </ol>
        </div>
        
      </main>
    );
  }
}

function mapStateToProps(state){
  return { 
    loc: state.loc,
    posts: state.posts,
    postsCurrent: state.postsCurrent,
    themeTerm: state.themeTerm,
    cityName: state.cityName
   };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListsFromTheme);
