export default function(state = "Change, if the address is not accurate.", action) {
  switch(action.type) {
    case 'GEO_FROM_IMAGE' :
      console.log("Got the Address from Image", action.payload);
      return action.payload;
    default:
      return state;
  }
}