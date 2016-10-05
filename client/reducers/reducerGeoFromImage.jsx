export default function(state = "", action) {
  switch(action.type) {
    case 'GEO_FROM_IMAGE' :
      console.log("Got the address from Image", action.payload);
      return action.payload;
    default:
      return state;
  }
}