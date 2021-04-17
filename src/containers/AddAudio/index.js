import { Component } from 'react';
import { Spinner, Form, Button, Container, Row, Col } from 'react-bootstrap';

class AddAudio extends Component {
  state = {
    title: {
      value: '',
    },
    audio: {
      value: null,
    },
    description: {
      value: '',
    },
    loading: false,
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
        console.log('weewewe');
        this.setState({
          loading: true,
        });
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating or editing a post failed!');
        }
        return res.json();
      })
      .then((resData) => {
        this.setState({
          loading: true,
        });
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
    const { title, description, audio, loading } = this.state;
    console.log(loading);
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
    if (loading) {
      form = <Spinner animation="grow" variant="info" />;
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
