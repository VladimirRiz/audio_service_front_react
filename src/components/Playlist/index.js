import { Col } from 'react-bootstrap';
import Player from '../../containers/Player';
import Aux from '../../hoc/Aux';
import { FaTrash } from 'react-icons/fa';

const Playlist = (props) => {
  return (
    <Aux>
      {props.lists.map((song) => (
        <Col
          key={song._id}
          className="p-2 d-flex justify-content-between align-items-center border "
        >
          <p>{song.title}</p>
          <Player audio={song.audio} />
          <FaTrash
            onClick={props.remove.bind(this, [
              song._id,
              props.token,
              props.playlistName,
            ])}
            className="pointer"
          />
        </Col>
      ))}
    </Aux>
  );
};

export default Playlist;
