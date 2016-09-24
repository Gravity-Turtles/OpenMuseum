import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { createPost } from '../actions/actionCreators';

class Test extends Component{
  
  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        console.log('SUCCESSFULLY POSTED')
        // blog post has been created, navigate the user to the index
        // We navigate by calling this.context.router.push with the
        // new path to navigate to.

        // this.context.router.push('/');

      });
    }

    render(){      
        const { handleSubmit } = this.props;                        
        
        return (
          <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
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
},mapStateToProps,{ createPost })(Test);

export default Test;

