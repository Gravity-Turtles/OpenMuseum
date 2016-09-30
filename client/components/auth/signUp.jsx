import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/actionCreators';

class Signup extends Component {
  handleFormSubmit({ email, password }) {
    console.log("here inside handleSubmit");
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit} = this.props;
    console.log("inside signin form",this.props);

    return (
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div>
            <label htmlFor="name">Name: </label>
            <Field name="name" component="input" type="text" className="form-control" />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <Field name="email" component="input" type="text" className="form-control" />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <Field name="password" component="input" type="password" className="form-control" />
          </div>
          <div>
            <label htmlFor="password">Confirm Password: </label>
            <Field name="password" component="input" type="password" className="form-control" />
          </div>
          <br/>
          
          <button type="submit" className="btn btn-primary">Sign up</button>
        </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signup = reduxForm({
  form: 'signup',
})(Signup);


export default connect(mapStateToProps, actions)(Signup);