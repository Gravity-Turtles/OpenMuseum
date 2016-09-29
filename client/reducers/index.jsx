import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import geoFromSearch from './reducerGeoFromSearch';
import cityName from './reducerCityName';
import location from './reducerLocation';
import posts from './reducerPosts';
import comments from './reducerComments';

const rootReducer = combineReducers({
  geoFromSearch,
  cityName,
  location, 
  posts, 
  comments, 
  routing: routerReducer});

export default rootReducer;