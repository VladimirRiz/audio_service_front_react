import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';

const Post = (props) => {
  return (
    <Row xs={1} md={1} className="m-2 p-3 border">
      <Col className="d-flex flex-column justify-content-between">
        <h4> {props.title}</h4>
        <div className="Audio">
          <audio controls>
            <source src={props.audio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="d-flex  justify-content-between">
          <Link className="Post_button More_btn" to={props.link}>
            Show More
          </Link>
          {/* <Button
            variant="outline-warning"
            onClick={props.onEdit.bind(this, props.link)}
          > */}
          <Link
            className="Post_button Edit"
            onClick={props.onEdit.bind(this, props.link)}
            to={`/add-post/${props.link}`}
          >
            Edit
          </Link>
          {/* </Button> */}
          <Button
            variant="danger"
            onClick={props.delete.bind(this, props.link)}
          >
            Delete
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Post;
