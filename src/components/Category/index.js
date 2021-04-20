import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Category = (props) => (
  <Col
    xs={6}
    md={4}
    className="border p-3 d-flex flex-column align-items-center"
  >
    <h3>{props.name}</h3>
    <div className="d-flex">
      <Link className="Post_button More_btn" to={props.link}>
        Show More
      </Link>
    </div>
  </Col>
);

export default Category;
