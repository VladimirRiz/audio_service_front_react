import { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { fetchPlaylists, fetchPosts, removeFromPlaylist } from '../../store/AC';
import Playlist from '../../components/Playlist';

class Playlists extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchPlaylists(this.props.userId);
  }

  getUrl = (postId) => {
    const posts = [...this.props.posts].filter((post) => {
      return post._id.toString() === postId.toString();
    });
    console.log(posts);
    return posts;
  };
  render() {
    // console.log(this.props.posts);
    const playlist =
      this.props.playlists && this.props.playlists.length > 0 ? (
        this.props.playlists.map((playlist) => {
          const songs = playlist.songs.map((id) => {
            return (
              <Playlist
                token={this.props.token}
                remove={this.props.removeFromPlaylist}
                lists={this.getUrl(id)}
              />
            );
          });
          return (
            <Col>
              <Col
                className="p-3 d-flex justify-content-between align-items-center border border-dark rounded"
                key={playlist.name}
              >
                <div>
                  <h3>{playlist.name}</h3>
                  <p>Songs: {playlist.songs.length}</p>
                </div>
                <div>
                  <Button variant="info">Show playlist</Button>
                </div>
              </Col>
              <Col className="mt-3">{songs}</Col>
            </Col>
          );
        })
      ) : (
        <h1>No Playlists Yet</h1>
      );
    return (
      <Container className="mt-5">
        <Row className="justify-content-around ">{playlist}</Row>
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
  };
};

const mapDispatchToProps = { fetchPlaylists, fetchPosts, removeFromPlaylist };

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
