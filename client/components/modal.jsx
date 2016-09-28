import React, { Component } from 'react';
import jquery from 'jquery';
import { Bootstrap } from 'react-bootstrap';
import { Button, Modal, showModal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default class myModal extends Component {
    constructor(props){
     super(props)
    this.state = {
      oldArt: '',
      showModal: false,
      newName: '',
      newDescription: ''
    };

    this.getInitialState = this.getInitialState.bind(this)
    this.close = this.close.bind(this)
    this.open = this.open.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.onSubmission = this.onSubmission.bind(this);
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
    this.setState({ oldArt: this.props.props.posts[currentArt]})
    console.log("mah state: ", this.state);
  }

  onSubmission(){
    event.preventDefault()
    
    let payload = this.state;
    console.log("meee payload", payload);
    this.props.props.editArt(payload);

  }


  render() {
    const i = this.props.props.posts.findIndex((post) => post._id === this.props.props.params.id);
    console.log("post index", i);


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
