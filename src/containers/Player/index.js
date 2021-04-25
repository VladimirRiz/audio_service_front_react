import { Component } from 'react';
import Aux from '../../hoc/Aux';
import './style.css';
import { MdPlayArrow, MdPause } from 'react-icons/md';

class Player extends Component {
  state = {
    isPlaying: false,
    isPlayed: false,
  };

  playPreview = () => {
    if (!this.state.isPlaying) {
      if (!this.state.isPlayed) {
        this.props.setPlays();
      }
      this.setState({ isPlaying: true, isPlayed: true });
      this.audioRef.play();
    } else {
      this.setState({ isPlaying: false });
      this.audioRef.pause();
    }
  };

  isPlay = () => {
    const { isPlaying, isPlayed } = this.state;
    if (!isPlaying && !isPlayed)
      return <MdPlayArrow className="Player_btns" onClick={this.playPreview} />;
    return !isPlaying ? (
      <MdPlayArrow className="Player_btns" onClick={this.playPreview} />
    ) : (
      <MdPause className="Player_btns" onClick={this.playPreview} />
    );
  };

  render() {
    return (
      <Aux>
        {this.isPlay()}
        <audio
          onClick={this.playPreview}
          controls
          ref={(input) => {
            this.audioRef = input;
          }}
          src={this.props.audio}
        />
      </Aux>
    );
  }
}

export default Player;
