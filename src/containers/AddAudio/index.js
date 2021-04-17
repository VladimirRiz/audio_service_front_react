import { Component } from 'react';
// import { connect } from 'react-redux';
// import classes from './style.css';
// import Button from '../../../components/UI/Button';
import { Spinner, Form, Button, Container, Row, Col } from 'react-bootstrap';
// import Input from '../../../components/UI/Input';
// import { purchaseBurger } from '../../../store/AC';
import { generateBase64FromAudio } from '../../util/audio';

class AddAudio extends Component {
  state = {
    title: {
      value: 'text',
    },
    audio: {
      value: null,
    },
    description: {
      value: '',
    },

    formIsValid: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    const { title, audio, description } = this.state;
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('audio', audio.value);
    formData.append('description', description.value);
    let url = 'http://localhost:8080/feed/post';
    let method = 'POST';
    fetch(url, {
      method,
      body: formData,
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating or editing a post failed!');
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => console.log(err));
  };

  checkValid(rules, value) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  onChangeHandler = ({ target }, id) => {
    if (target.type === 'file') {
      this.setState({
        ...this.state,
        audio: {
          value: target.files[0],
        },
      });
      // generateBase64FromAudio(target.files[0])
      //   .then((b64) => {
      //     console.log(target.value);
      //     this.setState({
      //       ...this.state,
      //       audio: {
      //         value: b64,
      //       },
      //     });
      //   })
      //   .catch((err) => {
      //     this.setState({ audio: { value: null } });
      //   });
    } else {
      this.setState({
        ...this.state,
        [target.name]: {
          value: target.value,
        },
      });
    }
  };

  render() {
    console.log(this.state);
    const { title, description, audio } = this.state;
    let form = (
      <Form onSubmit={this.orderHandler}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter title"
            defaultValue={title.value}
            onChange={this.onChangeHandler}
          />
        </Form.Group>
        <Form.Group>
          <Form.File
            name="audio"
            id="exampleFormControlFile1"
            label="Choose your file"
            defaultValue={audio.value}
            onChange={this.onChangeHandler}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            defaultValue={description.value}
            onChange={this.onChangeHandler}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
    if (this.props.loading) {
      form = <Spinner animation="grow" variant="light" />;
    }
    return (
      <Container className="mt-5">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h4>Enter Your Data!</h4>
            {form}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AddAudio;
