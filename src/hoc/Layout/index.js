import { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar';
import Aux from '../Aux';

class Layout extends Component {
  render() {
    return (
      <Aux>
        <Toolbar />
        <main>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
