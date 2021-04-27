import React, { Component } from 'react';
import { connect } from 'react-redux';

import { required, length, email } from '../../../util/validators';
import { Form, Button, Container, Row } from 'react-bootstrap';

import { auth } from '../../../store/AC';

import Spinner from '../../../UI/Spinner';
import Aux from '../../../hoc/Aux';

class UserForm extends Component {
  state = {
    signupForm: {
      email: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, email],
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })],
      },
      name: {
        value: '',
        valid: false,
        touched: false,
        validators: [required],
      },
    },
    formIsValid: false,
  };

  inputChangeHandler = ({ target }) => {
    this.setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.signupForm[target.name].validators) {
        isValid = isValid && validator(target.value);
      }

      const updatedForm = {
        ...prevState.signupForm,
        [target.name]: {
          ...prevState.signupForm[target.name],
          valid: isValid,
          value: target.value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        signupForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => {
      return {
        signupForm: {
          ...prevState.signupForm,
          [input]: {
            ...prevState.signupForm[input],
            touched: true,
          },
        },
      };
    });
  };

  onSignUp = (e) => {
    e.preventDefault();
    const { email, password, name } = this.state.signupForm;
    const formData = new FormData();
    formData.append('email', email.value);
    formData.append('password', password.value);
    formData.append('name', name.value);
    const settings = {
      method: 'PUT',
      body: formData,
    };
    this.props.createUser(settings, this.props.token);
  };

  isError = () => {
    return this.props.error ? this.props.error.message : null;
  };

  isLoading = () => {
    const { email, password, name } = this.state.signupForm;
    return this.props.loading ? (
      <Spinner />
    ) : (
      <Container className="mt-5">
        <Row className="m-5 justify-content-center">
          {this.isError()}
          <Form onSubmit={this.onSignUp}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={email.value}
                onChange={this.inputChangeHandler}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={name.value}
                onChange={this.inputChangeHandler}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password.value}
                onChange={this.inputChangeHandler}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={!this.state.formIsValid}
            >
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    );
  };

  render() {
    return <Aux>{this.isLoading()}</Aux>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.users.loading,
    error: state.users.error,
  };
};

const mapDispatchToProps = { auth };

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
