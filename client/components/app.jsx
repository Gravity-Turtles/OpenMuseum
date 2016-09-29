import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import MainNav from './mainNav';

function mapStateToProps(state) {
  return {
    geoFromSearch: state.geoFromSearch,
    cityName: state.cityName,
    location: state.location,
    posts: state.posts,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(MainNav);

export default App;