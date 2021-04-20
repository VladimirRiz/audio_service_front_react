import { Component } from 'react';
import {
  Container,
  Row,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import Category from '../../components/Category';
import Spinner from '../../UI/Spinner';
import { fetchPostsCategory } from '../../store/AC';

class Categories extends Component {
  componentDidMount() {}

  getCategory = (category) => {
    this.props.fetchPostsCategory(category);
  };

  setGenreButton = () => {
    return this.props.categories.map((category) => (
      <ToggleButton
        variant="secondary"
        key={category}
        value={category}
        onClick={this.getCategory.bind(this, category)}
      >
        {category}
      </ToggleButton>
    ));
  };

  showItems = () => {
    return this.props.posts
      ? this.props.posts.map((post) => (
          <Category key={post._id} name={post.title} link={post._id} />
        ))
      : null;
  };

  render() {
    const categoryItem = this.props.loading ? <Spinner /> : this.showItems();
    return (
      <Container className="mt-5">
        <h1>Categories</h1>
        <Row className="d-flex flex-column justify-content-between">
          <h4>Music genre:</h4>
          <ToggleButtonGroup
            type="radio"
            name="options"
            aria-label="Basic example"
          >
            {this.setGenreButton()}
          </ToggleButtonGroup>
        </Row>
        <Row className="mt-5">{categoryItem}</Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    categories: state.posts.categories,
    loading: state.posts.loading,
  };
};

const mapDispatchToProps = { fetchPostsCategory };

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
