import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';

const Post = (props) => {
  return (
    <Row xs={1} md={1} className="m-2 p-3 border">
      <Col className="d-flex flex-column justify-content-between">
        <h4> {props.title}</h4>
        <div class="Audio">
          <audio controls>
            <source src={props.audio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div>
          <Link className="More_btn" to={props.link}>
            Show More
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default Post;
