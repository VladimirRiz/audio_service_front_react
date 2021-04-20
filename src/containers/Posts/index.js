import { Component } from 'react';

import { connect } from 'react-redux';
import {
  fetchPosts,
  removePost,
  createPostInit,
  editPostStart,
  editPostFinish,
  setLike,
} from '../../store/AC';

import Post from '../../components/Post';
import Spinner from '../../UI/Spinner';
import { Container, Row } from 'react-bootstrap';

class Posts extends Component {
  componentDidMount() {
    this.props.createPostInit();
    this.props.editPostFinish();
    this.props.fetchPosts();
  }

  onDelete = (postId) => {
    this.props.removePost(postId);
  };

  onEdit = (postId) => {
    const editPost = {
      ...this.props.posts.find((post) => post._id === postId),
    };
    this.props.editPostStart(editPost);
  };

  setLike = (postId) => {
    this.props.setLike(postId);
  };

  render() {
    const { posts, loading } = this.props;
    // console.log(posts);
    let audioPosts =
      posts.length > 0 ? (
        posts.map((post) => {
          return (
            <Post
              key={post._id}
              title={post.title}
              description={post.description}
              audio={post.audio}
              link={post._id}
              delete={this.onDelete}
              onEdit={this.onEdit}
              likes={post.likes}
              setLike={this.setLike.bind(this, post._id)}
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
        <Row className="justify-content-md-center">{audioPosts}</Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    loading: state.posts.loading,
    editPost: state.post,
  };
};

const mapDispatchToProps = {
  fetchPosts,
  removePost,
  createPostInit,
  editPostStart,
  editPostFinish,
  setLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
