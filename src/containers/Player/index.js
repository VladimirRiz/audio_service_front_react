import { Component } from 'react';
import { connect } from 'react-redux';
import { notAuth } from '../../store/AC';
import { Redirect } from 'react-router-dom';
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
        if (!this.props.isAuth) {
          this.props.notAuth();
        }
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
      <div>
        {this.props.counter === 10 ? <Redirect to="/signup" /> : null}
        {this.isPlay()}
        <audio
          style={{ width: '100%' }}
          onClick={this.playPreview}
          controls
          ref={(input) => {
            this.audioRef = input;
          }}
          src={this.props.audio}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
    counter: state.auth.counter,
  };
};

const mapDispatchToProps = { notAuth };

export default connect(mapStateToProps, mapDispatchToProps)(Player);
