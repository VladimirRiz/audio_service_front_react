import { Navbar } from 'react-bootstrap';
import audioLogo from '../../assets/music-note.svg';
import Aux from '../../hoc/Aux';

const Logo = (props) => {
  return (
    <Aux>
      <Navbar.Brand href="#home">
        <img
          src={audioLogo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
    </Aux>
  );
};

export default Logo;
