export default function(state = "Click Image to get address", action) {
  switch(action.type) {
    case 'GEO_FROM_IMAGE' :
      console.log("Got the Address from Image", action.payload);
      return action.payload;
    default:
      return state;
  }
}