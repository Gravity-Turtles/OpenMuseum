export default function(state = [], action) {
  switch(action.type) {
    case "FETCH_POSTS_CURRENT" :
      console.log("Got the POSTS CURRENT");
      return action.posts;
    default:
      return state;
  }
}


