import { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import {
  fetchPlaylists,
  fetchPosts,
  removeFromPlaylist,
  changeName,
} from '../../store/AC';
import Playlist from '../../components/Playlist';
import Spinner from '../../UI/Spinner';

class Playlists extends Component {
  state = {
    readOnly: true,
    value: '',
    id: null,
    touched: false,
  };
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchPlaylists(this.props.userId);
  }

  getUrl = (postId) => {
    const posts = [...this.props.posts].filter((post) => {
      return post._id.toString() === postId.toString();
    });
    return posts;
  };

  onClickInput = () => {
    this.setState({
      readOnly: false,
    });
  };

  onChange = ({ target }) => {
    this.setState({
      value: target.value,
      touched: true,
    });
  };

  onBlurInput = (id) => {
    if (this.state.touched) {
      this.setState({
        readOnly: true,
        touched: false,
      });
      const formData = new FormData();
      formData.append('name', this.state.value);
      this.props.changeName(id, this.props.token, formData);
    }
  };

  showPlaylist = (id) => {
    this.setState((prevState) => {
      return { id: prevState.id !== id ? id : null };
    });
  };

  render() {
    const playlist =
      this.props.playlists && this.props.playlists.length > 0 ? (
        this.props.playlists.map((playlist) => {
          const songs = playlist.songs.map((id) => {
            return (
              <Playlist
                key={id}
                token={this.props.token}
                remove={this.props.removeFromPlaylist}
                lists={this.getUrl(id)}
              />
            );
          });
          return (
            <Col key={playlist.name}>
              <Col className="mt-3 p-3 d-flex justify-content-between align-items-center border border-dark rounded">
                <div>
                  <Form>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                      <Col sm="10">
                        <Form.Control
                          plaintext
                          readOnly={this.state.readOnly}
                          defaultValue={playlist.name}
                          ref={(input) => {
                            this.nameInput = input;
                          }}
                          onChange={this.onChange}
                          onClick={this.onClickInput}
                          onBlur={this.onBlurInput.bind(this, [playlist._id])}
                        />
                      </Col>
                    </Form.Group>
                  </Form>

                  <p>Songs: {playlist.songs.length}</p>
                </div>
                <div>
                  <Button
                    variant="info"
                    onClick={this.showPlaylist.bind(this, playlist._id)}
                  >
                    Show playlist
                  </Button>
                </div>
              </Col>
              {this.state.id === playlist._id ? (
                <Col className="mt-3">{songs}</Col>
              ) : null}
            </Col>
          );
        })
      ) : (
        <h1>No Playlists Yet</h1>
      );
    return (
      <Container className="mt-5">
        {this.props.loading ? (
          <Spinner />
        ) : (
          <Row className="d-flex flex-column justify-content-around ">
            {playlist}
          </Row>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playlists: state.playlists.playlists,
    userId: state.auth.userId,
    posts: state.posts.posts,
    token: state.auth.token,
    loading: state.posts.loading,
  };
};

const mapDispatchToProps = {
  fetchPlaylists,
  fetchPosts,
  removeFromPlaylist,
  changeName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
