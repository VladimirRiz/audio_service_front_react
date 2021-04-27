import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, updateUser, createUser, removeUser } from '../../store/AC';
import { Container, ListGroup, Row } from 'react-bootstrap';

import Spinner from '../../UI/Spinner';
import SingleUser from './SingleUser';
import ModalWindow from '../../UI/Spinner/Modal';
import CreateUserForm from './CreateUserForm';

class Users extends Component {
  state = {
    id: null,
  };
  componentDidMount() {
    this.props.fetchUser(this.props.token);
  }

  onEdit = (id) => {
    this.setState((prevState) => {
      return {
        id: prevState.id !== id ? id : null,
      };
    });
  };

  render() {
    const users = this.props.users ? (
      this.props.users.map((user) => {
        return (
          <SingleUser
            key={user._id}
            id={user._id}
            name={user.name}
            status={user.status}
            onEdit={this.onEdit.bind(this, user._id)}
            isEdit={this.state.id}
            email={user.email}
            update={this.props.updateUser}
            token={this.props.token}
            remove={this.props.removeUser.bind(this, [
              user._id,
              this.props.token,
            ])}
          />
        );
      })
    ) : (
      <p>No Users</p>
    );
    return (
      <Container className="">
        <Row className="m-3">
          <ModalWindow text="Add User">
            <CreateUserForm
              createUser={this.props.createUser}
              token={this.props.token}
            />
          </ModalWindow>
        </Row>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <ListGroup className="">{users}</ListGroup>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    loading: state.users.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = { fetchUser, updateUser, createUser, removeUser };

export default connect(mapStateToProps, mapDispatchToProps)(Users);
