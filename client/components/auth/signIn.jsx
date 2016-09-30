import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signinUser } from '../../actions/actionCreators';

class Signin extends Component {
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
          <label htmlFor="email">Email: </label>
          <Field name="email" component="input" type="text" className="form-control" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <Field name="password" component="input" type="password" className="form-control" />
        </div>
        <br/>
        { this.renderAlert() }
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin = reduxForm({
  form: 'signin',
})(Signin);


export default connect(mapStateToProps, { signinUser })(Signin);