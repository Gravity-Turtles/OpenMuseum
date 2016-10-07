export default function(state = "", action) {
  switch(action.type) {
    case "SEARCH_TERM" :
      console.log("Got the SEARCH TERM", action.payload);
      return action.payload;
    default:
      return state;
  }
}


