import { combineReducers } from 'redux';
import Location from './reducerLocation';

const rootReducer = combineReducers({
  location: Location
});

export default rootReducer;
