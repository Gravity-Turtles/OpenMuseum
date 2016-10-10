export default function(state = {}, action) {
  switch(action.type) {
    case "GET_LOCATION" :
      return action.loc;
    default:
      return state;
  }
}