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
      file: 'test',
      likes: 0
    };
    this.getGpsInfo = this.getGpsInfo.bind(this);
  }
  onSubmit(props) {
    this.props.createPost3(props)
  }
  getGpsInfo(event){
  EXIF.getData(event.target, function(){
    var lat = EXIF.getTag(this, "GPSLatitude").join(".");
    var lon = EXIF.getTag(this, "GPSLongitude").join(".");
    console.log('lat inside', lat, 'lon inside', lon);
    // need to get lat/lon refs for correct placement, i.e. +/-
    // something like the below
    
    var latRef = EXIF.getTag(this, "GPSLatitudeRef") || "N";  
    console.log('latRef', latRef);
    var lonRef = EXIF.getTag(this, "GPSLongitudeRef") || "W"; 
    console.log('typeof LON', typeof lon);
    Number(lon);
    console.log('typeof LON after parseInt', typeof lon);
    console.log('lonRef', lonRef);
    console.log('lat B4 timed', lat);
    
    latRef !== "N" ? lat * -1 : lat;
    // lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);  
    console.log('lat divided & timed', lat);
    console.log('LON B4 timed', lon);
    console.log('lon * -1 = ', lon * -1);
    lonRef === "W" ? (lon * -1) : lon;
    console.log('LON timed if negative...', lon);
    
    // lon = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef == "W" ? -1 : 1); 
  });
    
    // console.log('exif fn fired', EXIF.getData(event.target, function(){
    //   // need to handle the trailing zero after lat & lon are joined
    //   console.log('got EXIF latitude', EXIF.getTag(this, "GPSLatitude").join("."), 'got EXIF longitude', EXIF.getTag(this, "GPSLongitude").join("."));
    // }));
    /*
    console.log('exif fn fired', EXIF.getData(event.target, function(){
      // need to handle the trailing zero after lat & lon are joined
      console.log('got EXIF latitude', EXIF.getTag(this, "GPSLatitude").join("."), 'got EXIF longitude', EXIF.getTag(this, "GPSLongitude").join("."));
    }));
    */
  }
    render(){
      console.log("postNew props", this.props);
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
              <label htmlFor="location">Location</label>
              <Field name="location" component="input" type="text" className="form-control" placeholder="e.g. 1216 Broadway, NYC"/>                            
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
      loc: state.loc,
     }
}
// PostNew = reduxForm({
//   form: 'PostsTest'  
//   // validate
// },mapStateToProps,{ createPost3 })(PostNew);
PostNew = reduxForm({
  form: 'PostsTest'  
  // validate
})(PostNew);
export default connect(mapStateToProps,{ createPost3 })(PostNew);