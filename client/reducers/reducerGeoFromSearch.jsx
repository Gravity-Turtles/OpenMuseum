export default function(state = {}, action) {
  switch(action.type) {
    case "GET_GEO_SEARCH" :
      console.log("Got the Geolocation from Search", action.geoFromSearch);
      return action.geoFromSearch;
    default:
      return state;
  }
}