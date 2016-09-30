export default function(state = {}, action) {
  switch(action.type) {
    case "GET_LOCATION" :
      console.log("Got the location");
      console.log(action.loc);
      return action.loc;
    default:
      return state;
  }
}