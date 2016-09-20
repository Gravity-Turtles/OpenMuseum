// instructions from here:
// https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#the-map-container-component


// let's build our container component to demonstrate usage as well as be responsible for loading the Google Api:

// GoogleApiComponent...

export class Container extends React.Component {
  render() {
    // set map to occupy 50% of height/width of page
    const style = {
      width: '50vw',
      height: '50vh'
    }
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }    
    return (
      <div style={style}>
        <Map google={this.props.google} />
      </div>
    )
  }
}

export default GoogleApiComponent({
  // apiKey: __GAPI_KEY__  // need my API key here
  apiKey: AIzaSyAhGXxtVqDKGvf5ndh0jKhlzJkhZ2ejkm0
})(Container)