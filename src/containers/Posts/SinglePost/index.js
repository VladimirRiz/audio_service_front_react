import { Component } from 'react';
import Spinner from '../../../UI/Spinner';
import { Container, Row, Col } from 'react-bootstrap';

class SinglePost extends Component {
  state = {
    title: '',
    audio: '',
    description: '',
    loading: true,
  };
  componentDidMount() {
    const postId = this.props.match.params.postId;
    fetch(`http://localhost:8080/feed/post/${postId}`)
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        this.setState({
          title: resData.post.title,
          audio: `http://localhost:8080/${resData.post.audio}`,
          description: resData.post.description,
          loading: false,
          postId: resData.post._id,
        });
      })
      .catch((err) => console.log(err));
  }

  showPost = () => {
    const { title, audio, description, loading } = this.state;
    return loading ? (
      <Spinner />
    ) : (
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col className="d-flex flex-column justify-content-between">
            <h4>{title}</h4>
            <div>
              <audio controls>
                <source src={audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <p>{description}</p>
          </Col>
        </Row>
      </Container>
    );
  };

  render() {
    return <div>{this.showPost()}</div>;
  }
}

export default SinglePost;
