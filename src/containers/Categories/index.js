import { Component } from 'react';
import {
  Container,
  Row,
  ToggleButtonGroup,
  ToggleButton,
  Form,
  Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import Category from '../../components/Category';
import Spinner from '../../UI/Spinner';
import {
  fetchPostsCategory,
  fetchPopular,
  fetchPosts,
  createCategory,
} from '../../store/AC';
import ModalWindow from '../../UI/Spinner/Modal';

class Categories extends Component {
  state = {
    name: '',
  };

  componentDidMount() {
    this.props.fetchPosts();
  }

  getCategory = (category) => {
    this.props.fetchPostsCategory(category);
  };

  setGenreButton = () => {
    return this.props.categories['genre'].map((category) => (
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

  getPopular = (link) => {
    this.props.fetchPopular(link);
  };

  setOtherCategories = () => {
    return this.props.categories['other'].map((category) => {
      if (category.label === 'Liked By You' && !this.props.isAuth) return null;
      const link =
        category.label !== 'Liked By You'
          ? this.getPopular.bind(this, category.link)
          : this.getPopular.bind(this, `${category.link}/${this.props.userId}`);
      return (
        <ToggleButton
          variant="secondary"
          key={category.label}
          value={category.label}
          onClick={link}
        >
          {category.label}
        </ToggleButton>
      );
    });
  };

  showItems = () => {
    return this.props.posts
      ? this.props.posts.map((post) => (
          <Category key={post._id} name={post.title} link={post._id} />
        ))
      : null;
  };

  setName = ({ target }) => {
    this.setState({
      name: target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    this.props.createCategory(formData);
  };

  render() {
    const categoryItem = this.props.loading ? <Spinner /> : this.showItems();
    return (
      <Container className="mt-5">
        {this.props.isAuth && this.props.status === 'Admin' ? (
          <ModalWindow text="Add Category">
            <Form onSubmit={this.onSubmit}>
              <Form.Group className="m-5">
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Large text"
                  value={this.state.name}
                  onChange={this.setName}
                />
                <Button variant="primary" type="submit">
                  Add
                </Button>
              </Form.Group>
            </Form>
          </ModalWindow>
        ) : null}
        <h1>Categories</h1>
        <Row className="d-flex  justify-content-between">
          <div>
            <h4>Music genre:</h4>
            <ToggleButtonGroup
              type="radio"
              name="options"
              aria-label="Basic example"
            >
              {this.setGenreButton()}
            </ToggleButtonGroup>
          </div>
          <div>
            <h4>Other category:</h4>
            <ToggleButtonGroup
              type="radio"
              name="options"
              aria-label="Basic example"
            >
              {this.setOtherCategories()}
            </ToggleButtonGroup>
          </div>
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
    isAuth: state.auth.token !== null,
    userId: state.auth.userId,
    status: state.auth.status,
  };
};

const mapDispatchToProps = {
  fetchPostsCategory,
  fetchPopular,
  fetchPosts,
  createCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
