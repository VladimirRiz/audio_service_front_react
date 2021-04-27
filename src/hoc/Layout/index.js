import { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar';
import Aux from '../Aux';
import { connect } from 'react-redux';

class Layout extends Component {
  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          status={this.props.status}
        />
        <main>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    status: state.auth.status,
    playlists: state.playlists.playlists,
  };
};

export default connect(mapStateToProps)(Layout);
