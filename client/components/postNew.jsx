import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from'react-dropzone';


class PostNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
      	latitude: 40.745010, 
      	longitude: 73.990410	
      },	
      title: '',
      description: '',
      files: [],
      likes: 0

    };

    this.onArtChange = this.onArtChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.getGpsInfo = this.getGpsInfo.bind(this);
  }

  getGpsInfo(event){
    EXIF.getData(event.target, function(){
      var lat = EXIF.getTag(this, "GPSLatitude").join(".");
      var lon = EXIF.getTag(this, "GPSLongitude").join(".");
    console.log('lat inside', lat, 'lon inside', lon);

      // need to get lat/lon refs for correct placement, i.e. +/-
      // something like the below
      
      var latRef = EXIF.getTag(this, "GPSLatitudeRef") || "N";  
      console.log('latRef', latRef);
      var lonRef = EXIF.getTag(this, "GPSLongitudeRef") || "W"; 

      console.log('typeof LON', typeof lon);
      Number(lon);
      console.log('typeof LON after parseInt', typeof lon);

      console.log('lonRef', lonRef);
      console.log('lat B4 timed', lat);
      
      latRef !== "N" ? lat * -1 : lat;

      // lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);  
      console.log('lat divided & timed', lat);

      console.log('LON B4 timed', lon);
      console.log('lon * -1 = ', lon * -1);
      lonRef === "W" ? (lon * -1) : lon;
      console.log('LON timed if negative...', lon);
      
      // lon = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef == "W" ? -1 : 1); 

    });

    
    // console.log('exif fn fired', EXIF.getData(event.target, function(){
    //   // need to handle the trailing zero after lat & lon are joined
    //   console.log('got EXIF latitude', EXIF.getTag(this, "GPSLatitude").join("."), 'got EXIF longitude', EXIF.getTag(this, "GPSLongitude").join("."));
    // }));

    /*
    console.log('exif fn fired', EXIF.getData(event.target, function(){
      // need to handle the trailing zero after lat & lon are joined
      console.log('got EXIF latitude', EXIF.getTag(this, "GPSLatitude").join("."), 'got EXIF longitude', EXIF.getTag(this, "GPSLongitude").join("."));
    }));
    */
  }

  onArtChange(event){
  	this.setState({title: event.target.value});
  }
  
  onDescriptionChange(event){
  	this.setState({description: event.target.value})
  }

  onImageChange(event){
  	this.setState({image: event.target.value})
  }

  onDrop(file){
    // console.log('Received DropZone files: ', file);
    var slicedArray = this.state.files.slice()
  	// console.log("slicedArray", slicedArray)
  	slicedArray.push(file[0])

  	this.setState({ files: slicedArray })
  	console.log("after drop, current state.files: ", this.state.files, 'after push slicedArray', slicedArray);
  }

  onFormSubmit(event){
  	
  	event.preventDefault();
  	let payload = this.state;
  	console.log("in onFormSubmit!!! with state: ", this.state, "and payload: ", payload);
  	
  	axios.post('/api/art', payload)
    .then(function(response){
    console.log('saved successfully')
  });  	


  }

  render() {
    return (
      <main>
        <h1>Post Page</h1>
        <br></br>
        <form onSubmit={this.onFormSubmit} encType="multipart/form-data">
          <input type="text" placeholder="Title of Artwork" value={this.state.title} onChange={this.onArtChange}/>
            <br></br>
        	<textarea type="text" placeholder="Description" value={this.state.description} onChange={this.onDescriptionChange}/>
        	<br></br> 
        	 <Dropzone value={this.state.files} onDrop={this.onDrop}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            <input type="submit"/>
            <br></br>
            {this.state.files.length > 0 ? <div>
                <h2>Uploading {this.state.files.length} files...</h2>
                <div>{this.state.files.map((file, i) => <img id="file-input" onClick={this.getGpsInfo} key={i} src={file.preview} /> )}</div>
                </div> : null }
                

        </form>
      </main>
    );
  }



}

export default PostNew;
