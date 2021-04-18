import { Component } from 'react';
import Spinner from '../../../UI/Spinner';

class SinglePost extends Component {
  state = {
    title: '',
    audio: '',
    description: '',
    loading: true,
  };
  componentDidMount() {
    const postId = this.props.match.params.postId;
    fetch(`http://localhost:8080/feed/post/${postId}`)
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        this.setState({
          title: resData.post.title,
          audio: `http://localhost:8080/${resData.post.audio}`,
          description: resData.post.description,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  showPost = () => {
    const { title, audio, description, loading } = this.state;
    return loading ? (
      <Spinner />
    ) : (
      <div>
        <h4>{title}</h4>
        <audio controls>
          <source src={audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <p>{description}</p>
      </div>
    );
  };

  render() {
    return <div>{this.showPost()}</div>;
  }
}

export default SinglePost;
