//basically a copy of test

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import request from 'superagent';

import { createPost3 } from '../actions/actionCreators';

const renderDropzoneInput = (field) => {  
  const files = field.input.value;
  return (
    <div>
      <Dropzone      
        name= "file"
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}        
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}

class Test extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onSubmit(props) {
    this.props.createPost3(props)

  }
    render(){
      console.log(this.state)
        const { handleSubmit } = this.props;                                
        return (
          <form id = "dropForm" className="dropzone" onSubmit = {handleSubmit(this.onSubmit.bind(this))} encType="multipart/form-data">
            <h3>Create A New Post</h3>
            <div>
              <label htmlFor="title">Title</label>
              <Field name="title" component="input" type="text" className="form-control" value="defaultValue"/>              
              <div className="text-help">                
              </div>
            </div>

            <div>
              <label htmlFor="longitude">Longitude</label>
              <Field name="longitude" component="input" type="text" className="form-control" placeholder="e.g. 40.73"/>                            
              <div className="text-help">                
              </div>
            </div>     

            <div>
              <label htmlFor="latitude">Latitude</label>
              <Field name="latitude" component="input" type="text" className="form-control" placeholder="e.g. -73.9"/>                            
              <div className="text-help">                
              </div>
            </div>     

            <div>
              <label htmlFor="description">Description</label>
              <Field name="description" component="input" type="text" className="form-control"/>                            
              <div className="text-help">                
              </div>
            </div>                

            <div>
              <label htmlFor="categories">Categories</label>
              <Field name="categories" component="input" type="text" className="form-control"/>                            
              <div className="text-help">                
              </div>
            </div>    

            <div>
              <label htmlFor="images">Files</label>
              <Field
                name="files"                            
                component={renderDropzoneInput}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>            
          </form>
        )
    }
}

function mapStateToProps({ location }){
    return { location };
}

Test = reduxForm({
  form: 'PostsTest'  
  // validate
},mapStateToProps,{ createPost3 })(Test);

export default Test;

