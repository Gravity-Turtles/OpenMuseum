import React, { Component } from 'react';


class PostNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artName: '',
      description: ''
    };

    this.onArtChange = this.onArtChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onArtChange(event){
  	this.setState({artName: event.target.value});
  }
  
  onDescriptionChange(event){
  	this.setState({description: event.target.value})
  }

  onFormSubmit(event){
  	console.log("in onFormSubmit!!! with state: ", this.state)
  	event.preventDefault();
  		//let {artName, description} = this.state;
  		 //scary destructuring
  }

  render() {
    return (
      <main>
        <h1>Post Page</h1>
        <form onSubmit={this.onFormSubmit}>
          <input type="text" placeholder="Name of Artwork" value={this.state.artName} onChange={this.onArtChange}/>
            <br></br>
        	<textarea type="text" placeholder="Description" value={this.state.description} onChange={this.onDescriptionChange}/>
        	<input type="submit"/>
        </form>
      </main>
    );
  }



}

export default PostNew;
// Contacts.defaultProps = {

// };
