import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signupUser } from '../../actions/actionCreators';

const renderField = ({ input, type, meta: { touched, error } }) => (
    <div>
      <input {...input} type={type} className="form-control"/>
      {touched && error && <div className="error">{error}</div>}
    </div>
)

class Signup extends Component {
  handleFormSubmit(formProps) {
    console.log("here inside Signup handleSubmit");
    this.props.signupUser(formProps);
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
    const { handleSubmit } = this.props;
    return (
      <div className="halfColPageWrapper">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div>
            <label htmlFor="name">Name: </label>
            <Field name="name" component="input" type="text" component={renderField} />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <Field name="email" component="input" type="text" component={renderField} />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <Field name="password" component="input" type="password" component={renderField} />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password: </label>
            <Field name="passwordConfirm" component="input" type="password" component={renderField} />
          </div>
          <br/>
          { this.renderAlert() }
          <button type="submit" className="btn btn-primary">Sign up</button>
        </form>
      </div>
    );
  }
}


function validate(formProps) {
  const errors = {};

  if (!formProps.name) {
    errors.name = 'Please enter your name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signup = reduxForm({
  form: 'signup',
  validate
})(Signup);


export default connect(mapStateToProps, { signupUser })(Signup);