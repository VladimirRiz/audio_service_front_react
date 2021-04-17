import { Component } from 'react';

import Post from '../../components/Post';

import { Spinner, Container, Row } from 'react-bootstrap';

class Posts extends Component {
  state = {
    posts: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      loading: true,
    });
    fetch('http://localhost:8080/feed/posts')
      .then((res) => {
        console.log('here');

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
        console.log(updatedPosts);
        this.setState({
          ...this.state,
          posts: updatedPosts,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { posts, loading } = this.state;
    let audioPosts = posts.map((post) => {
      return (
        <Post
          key={post._id}
          title={post.title}
          description={post.description}
          audio={post.audio}
        />
      );
    });
    if (loading) {
      audioPosts = <Spinner animation="grow" variant="info" />;
    }
    return (
      <Container>
        <Row className="justify-content-md-center"></Row>
        {audioPosts}
      </Container>
    );
  }
}

export default Posts;
