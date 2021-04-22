import { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar';
import Aux from '../Aux';
import { connect } from 'react-redux';

class Layout extends Component {
  render() {
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAuthenticated} />
        <main>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
