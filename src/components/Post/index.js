import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiFillEdit } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
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
        <div className="mb-3 d-flex  justify-content-between align-items-center">
          <div className="Likes" onClick={props.setLike}>
            <FaRegHeart /> <span>{props.likes}</span>
          </div>
          <Link className="Post_button More_btn" to={props.link}>
            Show More
          </Link>
        </div>
        <div className="d-flex  justify-content-end">
          <Link
            className="Post_button Edit"
            onClick={props.onEdit.bind(this, props.link)}
            to={`/add-post/${props.link}`}
          >
            <AiFillEdit />
          </Link>
          <Button
            variant="danger"
            className="d-flex align-items-center"
            onClick={props.delete.bind(this, props.link)}
          >
            <AiOutlineDelete />
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Post;
