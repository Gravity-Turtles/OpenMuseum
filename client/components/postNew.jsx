import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from'react-dropzone';


class PostNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
      	latitude: 40.746727,
      	longitude:	-73.987885
      },	
      title: '',
      description: '',
      files: [],
      image: ''

    };

    this.onArtChange = this.onArtChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onDrop = this.onDrop.bind(this)
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
    console.log('Received DropZone files: ', file);
    var slicedArray = this.state.files.slice()
	console.log("slicedArray", slicedArray)
	slicedArray.push(file[0])
	console.log(JSON.stringify(file[0]));
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
                <div>{this.state.files.map((file, i) => <img key={i} src={file.preview} /> )}</div>
                </div> : null}

        </form>
      </main>
    );
  }



}

export default PostNew;
