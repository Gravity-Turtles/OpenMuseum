// export default function(state = [], payload) {

// }


export default function(state = [], action) {
  switch(action.type) {
    case "COMMENTS" :
      console.log("COMMMENT REDUCER");
      console.log(action);
      console.log(action.payload);
      // console.log(action.payload.data._id);
      console.log(action.payload.data.comments);
      return action.payload.data
      // return Object.assign(state, { error: '', authenticated: true });
    default:
      return state;
  }
}