import { Component } from 'react';
import { FaTrash, FaUserEdit, FaRegSave } from 'react-icons/fa';
import { ListGroup, InputGroup, FormControl, Form } from 'react-bootstrap';

class SingleUser extends Component {
  componentDidMount() {
    this.setState({
      name: this.props.name,
      email: this.props.email,
      status: this.props.status,
    });
  }
  state = {
    name: '',
    email: '',
    status: '',
  };

  onChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  saveChanges = (userId) => {
    this.props.onEdit();
    const { name, email, status } = this.state;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('status', status);
    let url = `http://localhost:8080/auth/user/${userId}`;
    let method = 'PUT';
    // if (this.props.editPost) {
    //   method = 'DELETE';
    // }
    const settings = {
      method,
      body: formData,
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
    };
    this.props.update(url, settings, this.props.token);
  };

  render() {
    return (
      <ListGroup.Item className="d-flex justify-content-between align-items-center">
        <div>
          <InputGroup>
            <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              name="name"
              value={this.state.name}
              readOnly={!this.props.isEdit}
              onChange={this.onChange}
            />
            <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              name="email"
              value={this.state.email}
              readOnly={!this.props.isEdit}
              onChange={this.onChange}
            />
            <Form.Control
              as="select"
              name="status"
              onChange={this.onChange}
              value={this.state.status}
              disabled={!this.props.isEdit}
            >
              <option>User</option>
              <option>Admin</option>
              <option>Guest</option>
            </Form.Control>
          </InputGroup>
        </div>
        <div>
          {this.props.isEdit ? (
            <FaRegSave
              className="mr-3 pointer"
              onClick={this.saveChanges.bind(this, this.props.id)}
            />
          ) : null}
          <FaUserEdit onClick={this.props.onEdit} className="pointer mr-3" />
          <FaTrash className="pointer" onClick={this.props.remove} />
        </div>
      </ListGroup.Item>
    );
  }
}

export default SingleUser;
