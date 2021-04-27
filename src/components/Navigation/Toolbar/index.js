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
        <Nav.Link as={NavLink} to="/categories">
          Categories
        </Nav.Link>
        {props.isAuth ? (
          <Nav.Link as={NavLink} to="/playlists">
            Playlists
          </Nav.Link>
        ) : null}
        {props.isAuth && props.status === 'Admin' ? (
          <Aux>
            <Nav.Link as={NavLink} to="/add-post">
              Add Audio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/users">
              Users
            </Nav.Link>
          </Aux>
        ) : null}
      </Nav>
      <Nav className="justify-content-end">
        {!props.isAuth ? (
          <Aux>
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/signup">
              SignUp
            </Nav.Link>
          </Aux>
        ) : (
          <Nav.Link as={NavLink} to="/logout">
            Logout
          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  </Aux>
);

export default Toolbar;
