import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiFillEdit } from 'react-icons/ai';
import { FaRegHeart, FaHeart, FaPlus, FaCheck } from 'react-icons/fa';
import Player from '../../containers/Player';
import './style.css';

const Post = (props) => {
  return (
    <Row xs={1} md={1} className="m-2 p-3 border">
      <Col className="d-flex flex-column justify-content-between">
        <Col className="d-flex justify-content-between align-items-center">
          <h4> {props.title}</h4>
          {!props.inPlaylist ? (
            <FaPlus className="Add_Playlist" onClick={props.addToPlaylist} />
          ) : (
            <FaCheck />
          )}
        </Col>
        <div className="Audio">
          <Player audio={props.audio} setPlays={props.setPlays} />
          <p>{props.plays} plays</p>
        </div>
        <div className="mb-3 d-flex  justify-content-between align-items-center">
          <div
            className="Likes d-flex  justify-content-between align-items-center"
            onClick={props.setLike}
          >
            {props.isLike ? <FaHeart color="red" /> : <FaRegHeart />}{' '}
            <span>{props.likes}</span>
          </div>
          <Link className="Post_button More_btn" to={props.link}>
            Show More
          </Link>
        </div>

        {props.status === 'Admin' ? (
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
            </Button>{' '}
          </div>
        ) : null}
      </Col>
    </Row>
  );
};

export default Post;
