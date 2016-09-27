import React, { Component } from 'react';
import GoogleMap from './googleMap';
import jquery from 'jquery';
import { Bootstrap } from 'react-bootstrap';
import { Button, Modal, showModal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default class PostDetail extends Component {
    constructor(props){
     super(props)
    this.state = {
      showModal: false,
      newName: '',
      newDescription: '',
    };

    this.getInitialState = this.getInitialState.bind(this)
    this.close = this.close.bind(this)
    this.open = this.open.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
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
    this.setState({ newName: e.target.newName });
    console.log("mah state: ", this.state);
  }

  handleDescriptionChange(e) {
    this.setState({ newDescription: e.target.newDescription });
    console.log("mah state: ", this.state);
  }

  onSubmission(){
    let payload = this.state;
    console.log("meee payload", payload);

  }


  render() {
    const i = this.props.posts.findIndex((post) => post._id === this.props.params.id);
    console.log("post index", i);


    return (
      <main>
        <div style={{width:'100%', height:'300px'}}>
          <div style={{height:'100%'}}>
            <GoogleMap lat={this.props.posts[i].locLat} lng={this.props.posts[i].locLong} location={this.props.location}/>
          </div>
        </div>
        <h1>{this.props.posts[i].title}</h1>
        <div>Images here</div>
        <div>{this.props.posts[i].description}</div>

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
              <ControlLabel>Working example with validation</ControlLabel>
              <FormControl
              type="text"
              value={this.state.newName}
              placeholder="Enter text"
              onChange={this.handleNameChange}
              />
              </FormGroup>
              <h4>Description</h4>
              <FormGroup>
              <FormControl
              type="text"
              value={this.state.newDescription}
              placeholder="Enter text"
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
