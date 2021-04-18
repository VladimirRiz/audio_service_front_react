import { Component } from 'react';

import Post from '../../components/Post';
import Spinner from '../../UI/Spinner';
import { Container, Row } from 'react-bootstrap';

class Posts extends Component {
  state = {
    posts: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    fetch('http://localhost:8080/feed/posts')
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        const updatedPosts = [...this.state.posts];
        resData.posts.map((post) => {
          return updatedPosts.push({
            ...post,
            audio: `http://localhost:8080/${post.audio}`,
          });
        });
        this.setState({
          ...this.state,
          posts: updatedPosts,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  onDelete = (postId) => {
    this.setState({
      loading: true,
    });
    fetch(`http://localhost:8080/feed/post/${postId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState((prevState) => {
          const updatedPosts = prevState.posts.filter(
            (post) => post._id !== postId
          );
          return {
            posts: updatedPosts,
            loading: false,
          };
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { posts, loading } = this.state;
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

export default Posts;
