import React from 'react';
import { Component } from 'react';
import Spinner from '../../../UI/Spinner';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchPost } from '../../../store/AC';

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

  showPost = () => {
    const { title, audio, description } = this.props.post;
    return this.props.loading ? (
      <Spinner />
    ) : (
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col className="d-flex flex-column justify-content-between">
            <h4>{title}</h4>
            <div onClick={this.onPlay}>
              <audio controls ref={this.play}>
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

const mapStateToProps = (state) => {
  return {
    post: state.post.post,
    loading: state.post.loading,
  };
};

const mapDispatchToProps = { fetchPost };

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
