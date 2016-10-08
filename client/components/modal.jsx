import React, { Component } from 'react';
import jquery from 'jquery';
import { Bootstrap } from 'react-bootstrap';
import { Button, Modal, showModal, FormGroup, FormControl, ControlLabel, FieldGroup, Input } from 'react-bootstrap';
import myDropzone from './dropzone';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import { browserHistory } from 'react-router';


export default class myModal extends Component {
    constructor(props){
     super(props)
    this.state = {
      oldArt: '',
      showModal: false,
      newName: '',
      newDescription: '',
      images: []
    };

    this.getInitialState = this.getInitialState.bind(this)
    this.close = this.close.bind(this)
    this.open = this.open.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.onSubmission = this.onSubmission.bind(this);
    this.pushImage = this.pushImage.bind(this)
  }

    pushImage(image){
      var pushable = [];
      pushable.push(image);
      console.log('image', image, 'pushable array', pushable);
      this.setState({ images: pushable });
    }

    getInitialState() {
    return { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

   handleNameChange(e) {
    this.setState({ newName: e.target.value});
    console.log("mah state: ", this.state);
  }

  handleDescriptionChange(e) {
    const currentArt = this.props.props.posts.findIndex((post) => post._id === this.props.props.params.id);

    this.setState({ newDescription: e.target.value });
    this.setState({ oldArt: this.props.props.posts[currentArt]});
    console.log("mah state: ", this.state);
  }

  onSubmission(event){
    event.preventDefault();
    
    let payload = this.state;
    console.log("meee payload", payload);
    this.props.props.editArt(payload);
    //this.close();
    this.setState({ showModal: false })
    browserHistory.push('/')
    

  }


  render() {
    const i = this.props.props.posts.findIndex((post) => post._id === this.props.props.params.id);
    console.log("post index", i);

    // const field = this.props
    // const files = field.input.value;

    return (
      <main>
      <div>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={this.open}
        >
          Edit
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Art Listing</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          
            
            <form>
              <h4>Name</h4>
              <FormGroup>
              <FormControl
              type="text"
              value={this.state.newName}
              placeholder={this.props.props.posts[i].title}
              onChange={this.handleNameChange}
              />
              </FormGroup>
              
              <h4>Description</h4>
              <FormGroup>
              <FormControl
              componentClass="textarea"
              value={this.state.newDescription}
              placeholder={this.props.props.posts[i].description}
              onChange={this.handleDescriptionChange}
              />
              </FormGroup>


               

            </form>
          
      <Dropzone                  
        onDrop={( filesToUpload, e ) => {
          this.setState({images: [...this.state.images,filesToUpload]}, function(){            
            console.log('heres filesToUpload: ', filesToUpload);
            //field.input.onChange(this.state.images); //done in callback bc setState doesn't immediately mutate state
          });               
        }
      }
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {this.state.images.length > 0 ? <div>
          <h2>Uploading {this.state.images.length} files...</h2>
          <div id="imageContainer">{this.state.images.map((file) => <img key={file[0].name} className="imagePreview" src={file[0].preview} /> )}</div>
       </div> : null}
          
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onSubmission}>Submit</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

      </main>
    );
  }
}
