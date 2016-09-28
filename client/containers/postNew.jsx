import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import request from 'superagent';

import { createPost3 } from '../actions/actionCreators';

class renderDropzoneInput extends Component{
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }
  onSubmit(props) {
    this.props.createPost3(props)

  }
  render(){
    // const { value, onChange } = this.props
    const field = this.props
    const files = field.input.value;  
    
  return (
    <div>
      <Dropzone                  
        onDrop={( filesToUpload, e ) => {
          this.setState({images: [...this.state.images,filesToUpload]}, function(){            
            field.input.onChange(this.state.images); //done in callback bc setState doesn't immediately mutate state
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
    </div>
  );

  }
}

class PostNew extends Component{
  constructor(props) {
    super(props);
    this.state = {
      file: 'test'
    };
  }
  onSubmit(props) {
    this.props.createPost3(props)

  }
    render(){
      
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
            <button type="submit" className="btn btn-primary" id="buttonNew">Submit</button>            
          </form>
        )
    }
}

function mapStateToProps(state){
    return { 
      location: state.location,

     }
}

PostNew = reduxForm({
  form: 'PostsTest'  
  // validate
},mapStateToProps,{ createPost3 })(PostNew);

export default PostNew;
