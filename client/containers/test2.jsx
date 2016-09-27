import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import request from 'superagent';
import FileInput from 'react'

// FileInput = require('react-file-input');

import { createPost } from '../actions/actionCreators';
import { createPost3 } from '../actions/actionCreators';


class Test2 extends Component{
    constructor(props) {
    super(props);

    this.state = {
      files: []

    };
  }

    onDrop(files) {
      console.log('ondrop!')
      var req = request.post('api/art');
      // files.forEach((file)=> {
      //     req.attach(file.name, file);

      // });
      // req.end(function(){
      //   console.log('sent')
      // });
    }

    onOpenClick() {
      this.refs.dropzone.open();
    }

    render(){
        // const onDrop = this.props.onDrop;
        return (
            <div>
                <Dropzone ref="dropzone" onDrop={this.onDrop}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                <button type="button" onClick={this.onOpenClick}>
                    Open Dropzone
                </button>
                {this.state.files.length > 0 ? <div>
                <h2>Uploading {this.state.files.length} files...</h2>
                <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
                </div> : null}
            </div>

        )
    }



}

function mapStateToProps({ location }){
    return { location };
}

Test2 = reduxForm({
  form: 'PostsTest'  
  // validate
},mapStateToProps,{ createPost3 })(Test2);

export default Test2;

