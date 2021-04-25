import { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { required, length } from '../../../../util/validators';

class AddComment extends Component {
  state = {
    comment: {
      value: '',
      valid: false,
      touched: false,
      validators: [required, length({ min: 5 })],
    },
    formIsValid: false,
  };

  onChange = ({ target }) => {
    this.setState((prevState) => {
      let isValid = true;
      for (const validator of prevState[target.name].validators) {
        isValid = isValid && validator(target.value);
      }
      const updatedComment = {
        ...prevState[target.name],
        valid: isValid,
        value: target.value,
      };
      let formIsValid = true;
      formIsValid = formIsValid && updatedComment.valid;
      return {
        comment: updatedComment,
        formIsValid: formIsValid,
      };
    });
  };

  setComment = () => {
    const { id, token } = this.props;
    const formData = new FormData();
    formData.append('comment', this.state.comment.value);
    const settings = {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    this.props.setComment(id, settings);
  };

  render() {
    return (
      <Form onSubmit={this.setComment}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Your Comment:</Form.Label>
          <Form.Control
            onChange={this.onChange}
            as="textarea"
            name="comment"
            rows={3}
            value={this.state.comment.value}
          />
        </Form.Group>
        <Button
          disabled={!this.state.formIsValid}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    );
  }
}

export default AddComment;
