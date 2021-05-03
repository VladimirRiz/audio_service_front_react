import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiFillEdit } from 'react-icons/ai';
import { FaRegHeart, FaHeart, FaPlus, FaCheck } from 'react-icons/fa';
import Player from '../../containers/Player';
import './style.css';

const Post = (props) => {
  return (
    // <Row className="m-2 p-3 border">
    <Col md={6} className="p-2 d-flex flex-column justify-content-around ">
      <div className="pt-2 shadow-sm p-3 mb-3 bg-white rounded">
        <Col className="mb-2 d-flex justify-content-between align-items-center">
          <h2 style={{ margin: 0 }}> {props.title}</h2>
          {props.token ? (
            <div>
              {!props.inPlaylist ? (
                <FaPlus
                  className="Add_Playlist"
                  onClick={props.addToPlaylist}
                />
              ) : (
                <FaCheck />
              )}
            </div>
          ) : null}
        </Col>
        <Col className="Audio mb-2">
          <Player audio={props.audio} setPlays={props.setPlays} />
        </Col>
        <Col className="d-flex justify-content-between">
          <small>{props.plays} plays</small>
          <div
            className="Likes d-flex  justify-content-between align-items-center"
            onClick={props.token ? props.setLike : null}
          >
            {props.isLike ? <FaHeart color="red" /> : <FaRegHeart />}{' '}
            <span>{props.likes}</span>
          </div>
        </Col>
        <Col className="mt-2 d-flex  justify-content-between align-items-center">
          <Link className="Post_button More_btn" to={props.link}>
            See More
          </Link>
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
      </div>
    </Col>
    // </Row>
  );
};

export default Post;
