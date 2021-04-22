import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheckState } from './store/AC';

import './App.css';
import AddAudio from './containers/AddAudio';
import Layout from './hoc/Layout';
import Posts from './containers/Posts';
import SinglePost from './containers/Posts/SinglePost';
import Categories from './containers/Categories';
import Login from './containers/Auth/Login';
import Signup from './containers/Auth/Signup';
import Logout from './containers/Auth/Logout';

function App(props) {
  useEffect(() => {
    props.authCheckState();
  });
  return (
    <Layout>
      <Switch>
        <Route path="/categories" component={Categories} />
        <Route path="/add-post" component={AddAudio} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/signup" component={Signup} />
        <Route path="/add-post/:postId" component={AddAudio} />
        <Route path="/:postId" component={SinglePost} />
        <Route path="/" exact component={Posts} />
      </Switch>
    </Layout>
  );
}

const mapDispatchToProps = { authCheckState };

export default connect(null, mapDispatchToProps)(App);
