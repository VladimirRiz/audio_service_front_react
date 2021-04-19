import { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Post from '../../../components/Post';

class Category extends Component {
  render() {
    return (
      <Aux>
        <Post />
      </Aux>
    );
  }
}

export default Category;
