import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { createPost3, updateLocFromImage } from '../actions/actionCreators';

class renderDropzoneInput extends Component{
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
    this.getGpsInfo = this.getGpsInfo.bind(this);
  }
  onSubmit(props) {
    this.props.createPost3(props)
  }

  getGpsInfo(event){
  
    var getGpsFromImage = function () {
      return new Promise(function(resolve, reject) {
        EXIF.getData(event.target, function(){
          var geoLocFromImage = {};
          var lat = EXIF.getTag(this, "GPSLatitude");
          var lon = EXIF.getTag(this, "GPSLongitude");

          var latRef = EXIF.getTag(this, "GPSLatitudeRef") || "N";  
          var lonRef = EXIF.getTag(this, "GPSLongitudeRef") || "W"; 

          geoLocFromImage.lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);  
          geoLocFromImage.lon = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef == "W" ? -1 : 1);
          resolve(geoLocFromImage);
        });    
      });
    }
    
    getGpsFromImage()
    .then((data) => {
      console.log(data);
      this.props.updateLocFromImage(data);
    });

    // var geoLocFromImage = {};
    // EXIF.getData(event.target, function(){
    //   var lat = EXIF.getTag(this, "GPSLatitude");
    //   var lon = EXIF.getTag(this, "GPSLongitude");

    //   var latRef = EXIF.getTag(this, "GPSLatitudeRef") || "N";  
    //   var lonRef = EXIF.getTag(this, "GPSLongitudeRef") || "W"; 

    //   geoLocFromImage.lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);  
    //   geoLocFromImage.lon = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef == "W" ? -1 : 1);
    //   // console.log("GPS from Image", geoLocFromImage);
    // });
    

    
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
          <div id="imageContainer">{this.state.images.map((file) => <img onClick={this.getGpsInfo} key={file[0].name} className="imagePreview" src={file[0].preview} /> )}</div>
       </div> : null}
    </div>
  );

  }
}


////////////////////////////////////////// 

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

  componentDidUpdate() {
    this.handleInitialize();
  }

  handleInitialize() {
    const initData = {
    "title": "Test title",
    "location": this.props.geoFromImage,
    "description": this.props.loc.longitude
    };
    this.props.initialize(initData);
  }
  
  render(){
    // console.log("postNew props", this.props);
    const { handleSubmit } = this.props;                                
    return (
      <form id = "dropForm" className="dropzone" onSubmit = {handleSubmit(this.onSubmit.bind(this))} encType="multipart/form-data">
        <h3>Create A New Post</h3>
        <div>
          <label htmlFor="title">Title</label>
          <Field name="title" component="input" type="text" className="form-control" />              
          <div className="text-help">                
          </div>
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <Field name="location" component="input" type="text" className="form-control"  />                             
          <div className="text-help">                
          </div>
        </div>     

        <div>
          <label htmlFor="description">Description</label>
          <Field name="description" component="input" type="text" className="form-control" />                            
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
          <Field updateLocFromImage={this.props.updateLocFromImage}
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
    geoFromImage: state.geoFromImage
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


export default connect(mapStateToProps,{ createPost3, updateLocFromImage })(PostNew);
