export default function(state = "", action) {
  switch(action.type) {
    case "THEME_TERM" :
      console.log("Got the THEME TERM", action.payload);
      return action.payload;
    default:
      return state;
  }
}


