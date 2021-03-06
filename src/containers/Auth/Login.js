import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { auth } from '../../store/AC';

import { required, length, email } from '../../util/validators';

import { Form, Button, Container, Row } from 'react-bootstrap';
import Spinner from '../../UI/Spinner';

class Login extends Component {
  state = {
    loginForm: {
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
    },
    formIsValid: false,
  };

  inputChangeHandler = ({ target }) => {
    this.setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.loginForm[target.name].validators) {
        isValid = isValid && validator(target.value);
      }

      const updatedForm = {
        ...prevState.loginForm,
        [target.name]: {
          ...prevState.loginForm[target.name],
          valid: isValid,
          value: target.value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        loginForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => {
      return {
        loginForm: {
          ...prevState.loginForm,
          [input]: {
            ...prevState.loginForm[input],
            touched: true,
          },
        },
      };
    });
  };

  onLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state.loginForm;
    const formData = new FormData();
    formData.append('email', email.value);
    formData.append('password', password.value);
    const settings = {
      method: 'POST',
      body: formData,
    };
    this.props.auth('http://localhost:8080/auth/login', settings);
  };

  isError = () => {
    return this.props.error ? this.props.error.message : null;
  };

  isLoading = () => {
    const { email, password } = this.state.loginForm;
    return this.props.loading ? (
      <Spinner />
    ) : (
      <Form onSubmit={this.onLogin}>
        <h1>{this.isError()}</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={this.inputChangeHandler}
            value={email.value}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.inputChangeHandler}
            value={password.value}
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
    );
  };

  render() {
    const authRedirect = this.props.isAuth ? <Redirect to="/" /> : null;
    return (
      <Container className="mt-5">
        {authRedirect}
        <Row className="m-5 justify-content-center">{this.isLoading()}</Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = { auth };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
