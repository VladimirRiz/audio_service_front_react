import { Component } from 'react';
import { Container, Row, ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Category from '../../components/Category';
import Spinner from '../../UI/Spinner';

class Categories extends Component {
  state = {
    posts: [],
    loading: false,
  };

  componentDidMount() {}

  onClickkk = (category) => {
    this.setState({
      loading: true,
    });
    fetch(`http://localhost:8080/feed/posts/${category}`)
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        this.setState({
          posts: resData.posts,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const categoriesBtns = this.props.categories.map((category) => (
      <Button
        variant="secondary"
        key={category}
        onClick={this.onClickkk.bind(this, category)}
      >
        {category}
      </Button>
    ));
    const showItems = this.state.posts
      ? this.state.posts.map((post) => <Category name={post.title} />)
      : null;
    const categoryItem = this.state.loading ? <Spinner /> : showItems;
    return (
      <Container className="mt-5">
        <h1>Categories</h1>
        <ButtonGroup aria-label="Basic example">{categoriesBtns}</ButtonGroup>
        <Row className="">{categoryItem}</Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { categories: state.posts.categories };
};

export default connect(mapStateToProps)(Categories);
