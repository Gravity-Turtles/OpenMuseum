export default function(state = [], action) {
  switch(action.type) {
    case "COMMENTS" :
      return action.payload.data      
    default:
      return state;
  }
}