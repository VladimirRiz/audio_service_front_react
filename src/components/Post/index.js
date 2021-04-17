import { Row, Col } from 'react-bootstrap';

const Post = (props) => {
  return (
    <Row xs={1} md={1}>
      <Col>
        <h4>{props.title}</h4>
      </Col>
      <Col>
        <audio controls>
          <source src="horse.ogg" type="audio/ogg" />
          <source src={props.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </Col>
      <Col>
        <p>{props.description}</p>
      </Col>
    </Row>
  );
};

export default Post;
