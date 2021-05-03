import React from 'react';
import { Component } from 'react';
import Spinner from '../../../UI/Spinner';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchPost, setComment } from '../../../store/AC';
import AddComment from './AddComment';

class SinglePost extends Component {
  constructor(props) {
    super(props);
    // создание ссылки для хранения DOM-элемента textInput
    this.play = React.createRef();
  }
  componentDidMount() {
    const postId = this.props.match.params.postId;
    this.props.fetchPost(postId);
  }

  onPlay = () => {
    console.log(this.play.current, 'here');
  };

  showComments = () => {
    const { comments } = this.props.post;
    console.log(comments);
    return comments && comments.length > 0 ? (
      comments.map((comment, index) => {
        return (
          <Card className="p-3 mb-1" key={new Date() + index}>
            <h4>User: {comment.name}</h4>
            <p>{comment.text}</p>
          </Card>
        );
      })
    ) : (
      <p>No comments Yet</p>
    );
  };

  showPost = () => {
    const { title, audio, description, _id } = this.props.post;
    return this.props.loading ? (
      <Spinner />
    ) : (
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col
            md={{ span: 8 }}
            className="d-flex flex-column justify-content-between"
          >
            <h4>{title}</h4>
            <div onClick={this.onPlay}>
              <audio controls ref={this.play}>
                <source src={audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div>
              <h4>Description</h4>
              <p>{description}</p>
            </div>
            <hr />
            <div>
              <h4>Comments:</h4>
              {this.showComments()}
              {this.props.isAuth ? (
                <AddComment
                  id={_id}
                  token={this.props.token}
                  setComment={this.props.setComment}
                />
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  render() {
    return <div>{this.showPost()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post.post,
    loading: state.post.loading,
    token: state.auth.token,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = { fetchPost, setComment };

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
