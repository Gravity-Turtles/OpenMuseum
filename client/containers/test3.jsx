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


class Test3 extends Component{
    constructor(props) {
    super(props);

    this.state = {
      files: []

    };
  }


  handleChange(event) {
    console.log('Selected file:', event.target.files[0]);
  }
 
  render(){
    return (

      <h1> test </h1>

    )
  }




}

function mapStateToProps({ location }){
    return { location };
}

Test3 = reduxForm({
  form: 'PostsTest'  
  // validate
},mapStateToProps,{ createPost3 })(Test3);

export default Test3;

