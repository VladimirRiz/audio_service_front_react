import { Component } from 'react';

import { connect } from 'react-redux';
import {
  fetchPosts,
  removePost,
  createPostInit,
  editPostStart,
  editPostFinish,
  setLike,
  setPlays,
  filter,
  setToPlaylist,
  fetchPlaylists,
} from '../../store/AC';

import Post from '../../components/Post';
import Spinner from '../../UI/Spinner';
import { Container, Row, Form, FormControl } from 'react-bootstrap';

class Posts extends Component {
  state = {
    search: '',
  };

  componentDidMount() {
    this.props.createPostInit();
    this.props.editPostFinish();
    this.props.fetchPosts();
    if (this.props.token) {
      this.props.fetchPlaylists(this.props.userId);
    }
  }

  onDelete = (postId) => {
    this.props.removePost(postId, this.props.token);
  };

  onEdit = (postId) => {
    const editPost = {
      ...this.props.posts.find((post) => post._id === postId),
    };
    this.props.editPostStart(editPost);
  };

  setLike = (postId) => {
    this.props.setLike(postId, this.props.token);
  };

  setPlays = (postId) => {
    this.props.setPlays(postId, this.props.token);
  };

  onSearch = ({ target }) => {
    const filtered = [...this.props.posts].filter((post) => {
      return post.title.toLowerCase().includes(target.value.toLowerCase());
    });
    this.setState({
      search: target.value,
    });
    this.props.filter(filtered);
  };

  render() {
    const { posts, filteredPosts, loading, token, playlists } = this.props;
    let audioPosts =
      posts.length > 0 ? (
        filteredPosts.map((post) => {
          let isLike = null;
          let inPlaylist = null;
          if (this.props.userId) {
            isLike = post.likedBy.find((id) => {
              return id.toString() === this.props.userId.toString();
            });
          }
          if (playlists) {
            for (let key in playlists) {
              inPlaylist = playlists[key].songs.find(
                (id) => id.toString() === post._id.toString()
              );
            }
          }
          return (
            <Post
              key={post._id}
              token={this.props.token}
              title={post.title}
              description={post.description}
              audio={post.audio}
              link={post._id}
              delete={this.onDelete}
              onEdit={this.onEdit}
              likes={post.likes}
              isLike={isLike}
              plays={post.plays}
              setLike={this.setLike.bind(this, post._id)}
              setPlays={this.setPlays.bind(this, post._id)}
              status={this.props.status}
              inPlaylist={inPlaylist}
              addToPlaylist={this.props.setToPlaylist.bind(this, [
                post._id,
                token,
              ])}
            />
          );
        })
      ) : (
        <h3>Nothing to load</h3>
      );
    if (loading) {
      audioPosts = <Spinner animation="grow" variant="info" />;
    }
    return (
      <Container className="mt-5">
        <Row className="m-5">
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={this.onSearch}
              value={this.state.search}
            />
          </Form>
        </Row>
        <Row className="justify-content-around">{audioPosts}</Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    filteredPosts: state.posts.filteredPosts,
    loading: state.posts.loading,
    editPost: state.post,
    token: state.auth.token,
    userId: state.auth.userId,
    status: state.auth.status,
    playlists: state.playlists.playlists,
  };
};

const mapDispatchToProps = {
  fetchPosts,
  removePost,
  createPostInit,
  editPostStart,
  editPostFinish,
  setLike,
  setPlays,
  filter,
  setToPlaylist,
  fetchPlaylists,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
