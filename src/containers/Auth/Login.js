import React, { Component } from 'react';

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
    loading: false,
    isAuth: false,
    userId: null,
    token: null,
    error: null,
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
        console.log(updatedForm[inputName].valid);
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

  setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  onLogin = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.loginForm.email.value,
        password: this.state.loginForm.password.value,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          isAuth: true,
          token: resData.token,
          loading: false,
          userId: resData.userId,
        });
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          loading: false,
          error: err,
        });
      });
  };

  showForm = () => {
    const { email, password } = this.state.loginForm;
    return this.state.loading ? (
      <Spinner />
    ) : (
      <Form onSubmit={this.onLogin}>
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
    return (
      <Container className="mt-5">
        <Row className="m-5 justify-content-center">{this.showForm()}</Row>
      </Container>
    );
  }
}

export default Login;
