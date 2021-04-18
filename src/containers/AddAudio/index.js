import { Component } from 'react';
import Spinner from '../../UI/Spinner';
import { Redirect } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createPost } from '../../store/AC';

class AddAudio extends Component {
  state = {
    title: {
      value: '',
    },
    audio: {
      value: '',
    },
    description: {
      value: '',
    },
    loading: false,
    formIsValid: false,
    isEdit: false,
    editPost: null,
  };

  postHandler = (e) => {
    e.preventDefault();
    const { title, audio, description } = this.state;
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('audio', audio.value);
    formData.append('description', description.value);
    let url = 'http://localhost:8080/feed/post';
    let method = 'POST';
    if (this.props.editPost) {
      url = `http://localhost:8080/feed/post/${this.state.editPost._id}`;
      method = 'PUT';
    }
    const settings = {
      method,
      body: formData,
      // headers: {
      //   Authorization: `Bearer ${this.props.token}`,
      // },
    };
    console.log();
    this.props.createPost(url, settings);
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
    const redirect = this.props.redirect ? <Redirect to="/" /> : null;
    const { title, description } = this.state;
    let form = (
      <form onSubmit={this.postHandler}>
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
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <Container className="mt-5">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            {redirect}
            <h4>Enter Your Data!</h4>
            {form}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.post.loading,
    redirect: state.post.redirect,
  };
};

const mapDispatchToProps = { createPost };

export default connect(mapStateToProps, mapDispatchToProps)(AddAudio);
