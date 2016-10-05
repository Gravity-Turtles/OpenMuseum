export default function(state = [], action) {
  switch(action.type) {
    case "COMMENTS" :
      return action.payload.data
      // return Object.assign(state, { error: '', authenticated: true });
    default:
      return state;
  }
}