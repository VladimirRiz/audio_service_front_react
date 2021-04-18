import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import Logo from '../../Logo';

const Toolbar = (props) => (
  <Aux>
    <Navbar bg="dark" variant="dark">
      <Logo />
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} exact to="/">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/add-post">
          Add Audio
        </Nav.Link>
      </Nav>
    </Navbar>
  </Aux>
);

export default Toolbar;
