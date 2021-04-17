import { Navbar, Nav } from 'react-bootstrap';
import Aux from '../../../hoc/Aux';
import Logo from '../../Logo';

const Toolbar = (props) => (
  <Aux>
    <Navbar bg="dark" variant="dark">
      <Logo />
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Add Audio</Nav.Link>
      </Nav>
    </Navbar>
  </Aux>
);

export default Toolbar;
