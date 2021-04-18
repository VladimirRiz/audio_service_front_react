import { Component } from 'react';

import { connect } from 'react-redux';
import { fetchPosts, removePost } from '../../store/AC';

import Post from '../../components/Post';
import Spinner from '../../UI/Spinner';
import { Container, Row } from 'react-bootstrap';

class Posts extends Component {
  state = {
    posts: [],
    loading: false,
    edit: false,
    postEdit: null,
  };

  componentDidMount() {
    this.props.fetchPosts();
  }

  onDelete = (postId) => {
    this.props.removePost(postId);
  };

  onEdit = (postId) => {
    const loadedPost = [...this.state.posts].find(
      (post) => post._id === postId
    );
    console.log(this.state.posts, loadedPost);
  };

  render() {
    const { posts, loading } = this.props;
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
  };
};

const mapDispatchToProps = { fetchPosts, removePost };

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
