export default function(state = [], action) {
  switch(action.type) {
    case "FETCH_POSTS" :
      console.log("Got the POSTS");
      return action.posts;
    default:
      return state;
  }
}


