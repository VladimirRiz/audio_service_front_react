import { Col } from 'react-bootstrap';

const Category = (props) => (
  <Col xs={6} md={4}>
    <h3>{props.name}</h3>
    <button onClick={props.showCategory}>Show</button>
  </Col>
);

export default Category;
