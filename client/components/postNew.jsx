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
      files: '',
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

<<<<<<< 1f6569929b2707af34c6aad5bed7254feb805264
  onDrop(files){
      console.log('Received DropZone files: ', files);
      this.setState({files: files})
    }

=======
>>>>>>> adding pics to form
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
        <form onSubmit={this.onFormSubmit}>
          <input type="text" placeholder="Title of Artwork" value={this.state.title} onChange={this.onArtChange}/>
            <br></br>
        	<textarea type="text" placeholder="Description" value={this.state.description} onChange={this.onDescriptionChange}/>
        	<input type="file" value={this.state.image} onChange={this.onImageChange} />
        	<br></br>
        	 <Dropzone value={this.state.files} onDrop={this.onDrop}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
        	<input type="submit"/>
        </form>
      </main>
    );
  }



}

export default PostNew;
// Contacts.defaultProps = {

// };
