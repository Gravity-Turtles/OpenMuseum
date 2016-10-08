import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actionCreators';
import GoogleMap from './googleMap';

class PostListsFromSearch extends Component {

  renderPost() {
    if(this.props.posts === undefined) {
      return <div>loading</div>;
    }
    return this.props.posts.map((post) => {
      return ( 
        <li className="clearf" key={post._id}>
          <Link to={"posts/" + post._id}>
            <img className="thumbNail" src="http://www.museumofthecity.org/wp-content/uploads/2015/05/lv_e0410570654f3226f31b3546a0c123bbab3b2ccd.jpg" />
            <div className="listContents">
              <strong>{post.title}</strong><br/>
            </div>
          </Link>
        </li>
      );
    });
  }

  renderMap() {
    if (!this.props.geoFromSearch.latitude) {
      return (
        <div> loading...</div>
      );
    }
    console.log("length of posts", this.props.postsCurrent.length);
    if (this.props.postsCurrent.length) {
      console.log("something around your Search");
      return (
        <div style={{height:'100%'}}>
          <GoogleMap lat={this.props.geoFromSearch.latitude} lng={this.props.geoFromSearch.longitude} zoomSize={15} {...this.props}/>
        </div>
      );
    } else {
      console.log("nothing around your Search");
      return (<div> Nothing around your Search. </div>);
    }
  }

  render() {
    return (
      <main>
        <h2>Near {this.props.searchTerm}</h2>
        <div style={{width:'100%', height:'350px'}}>
          {this.renderMap()}
        </div>
        <ol className="postLists">
          {this.renderPost()}
        </ol>
        
      </main>
    );
  }
}

function mapStateToProps(state){
  return { 
    loc: state.loc,
    geoFromSearch: state.geoFromSearch,
    posts: state.posts,
    postsCurrent: state.postsCurrent,
    searchTerm: state.searchTerm
   };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListsFromSearch);
