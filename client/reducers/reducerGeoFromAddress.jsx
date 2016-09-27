export default function(state = {}, action) {
  switch(action.type) {
    case "GET_GEO_ADDRESS" :
      console.log("Got the Geolocation from Address", action.geoFromAddress);
      return action.geoFromAddress;
    default:
      return state;
  }
}