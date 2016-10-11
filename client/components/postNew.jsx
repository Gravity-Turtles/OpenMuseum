import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import store from '../store';
import * as actions from '../actions/actionCreators';
import { createPost3 } from '../actions/actionCreators';
import { browserHistory } from 'react-router';

const validate = values => {  
  const errors = {}
  if (!values.title) {
    errors.title = '*Required'
  } else if (values.title.length > 25) {
    errors.title = 'Must be 25 characters or less'
  }
  // if (!values.artist) {
  //   errors.artist = 'Required'
  // } 
  // if (!values.description) {
  //   errors.description = 'Required'
  // } 
  if (!values.location) {
    errors.location = '*Required'
  } 
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && error && <span className = "errorMessage">{error}</span>}
    </div>
  </div>
)
class renderDropzoneInput extends Component{
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
    this.getGpsInfo = this.getGpsInfo.bind(this);
  }

  getGpsInfo(event){  
    var getGpsFromImage = function () {
      return new Promise(function(resolve, reject) {
        EXIF.getData(event.target, function(){
          var geoLocFromImage = {};
          var lat = EXIF.getTag(this, "GPSLatitude");
          var lon = EXIF.getTag(this, "GPSLongitude");
          if (lat) {
            var latRef = EXIF.getTag(this, "GPSLatitudeRef") || "N";  
            var lonRef = EXIF.getTag(this, "GPSLongitudeRef") || "W"; 

            geoLocFromImage.lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);  
            geoLocFromImage.lon = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef == "W" ? -1 : 1);
            resolve(geoLocFromImage);
          } else {
            reject("no GPS data. Please type in the address.")
          }
        });    
      });
    }
    
    getGpsFromImage()
    .then((data) => {
      console.log(data);
      this.props.updateLocFromImage(data);
    })
    .catch((data) => {
      console.log(data);
      store.dispatch({type: 'GEO_FROM_IMAGE', payload: data});
    });
  }

  render(){
    // const { value, onChange } = this.props
    const field = this.props
    const files = field.input.value;  
    
  return (
    <div>
      <Dropzone className="dropZone"             
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
          <div id="imageContainer">{this.state.images.map((file) => <img onLoad={this.getGpsInfo} key={file[0].name} className="imagePreview" src={file[0].preview} /> )}</div>
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
    
    this.props.createPost3(props);
    console.log('after createPost3');
    browserHistory.push('/');
    console.log('afterpush');
  }

  componentDidUpdate() {
   this.props.autofill("location", this.props.geoFromImage);
  }
  
  render(){    
    const { handleSubmit } = this.props;                                
    return (

      <div className="oneColPage">
        <form id = "dropForm" className="dropzone" onSubmit = {handleSubmit(this.onSubmit.bind(this))} encType="multipart/form-data">
          <h3>Create A New Post</h3>
          <div>
            <label htmlFor="title">Title</label>
            <Field name="title" component={renderField} type="text" className="form-control" />              
          </div>          
          <div>
            <label htmlFor="artist">Artist</label>                            
            <Field name="artist" component={renderField} type="text" className="form-control" placeholder=""/>  
          </div>     
          <div>
            <label htmlFor="description">Description</label>
            <Field name="description" component={renderField} className="form-control" />                            
          </div>                
          <div>
            <label htmlFor="categories">Categories</label>
            <div>
              <div>
                <Field name="StreetArt" id="StreetArt" component="input" type="checkbox" />
                <span> Street Art</span>
              </div>
              <div>
                <Field name="Sculpture" id="Sculpture" component="input" type="checkbox" /> 
                <span> Sculpture</span>  
              </div>
              <div>
                <Field name="Architecture" id="Architecture" component="input" type="checkbox" /> 
                <span> Architecture / Sign</span> 
              </div>
              <div>
                <Field name="Mosaic" id="Mosaic" component="input" type="checkbox" /> 
                <span> Mosaic</span> 
              </div> 
              <div>
                <Field name="Historic" id="Historic" component="input" type="checkbox" /> 
                <span> Historic</span>
              </div> 
            </div>                          
          </div> 
          <div>
            <label htmlFor="images">Image Files</label>
            <Field updateLocFromImage={this.props.updateLocFromImage}
              name="files"                            
              component={renderDropzoneInput}
            />
          </div>
          <div className="locationInput">
            <label htmlFor="location">Location</label>                            
            <Field name="location" component="input" type="text" className="form-control" placeholder="Attach your image first."/>  
          </div> 
          <button type="submit" className="btn btn-primary" id="buttonNew">Submit</button>            
        </form>
      </div>
    )
  }
}
function mapStateToProps(state){
  return { 
    loc: state.loc,
    geoFromImage: state.geoFromImage
   }
}

PostNew = reduxForm({
  form: 'PostsTest',  
  validate
})(PostNew);

export default connect(mapStateToProps, actions)(PostNew);
