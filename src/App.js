import { Switch, Route } from 'react-router-dom';

import './App.css';
import AddAudio from './containers/AddAudio';
import Layout from './hoc/Layout';
import Posts from './containers/Posts';
import SinglePost from './containers/Posts/SinglePost';
import Categories from './containers/Categories';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/categories" component={Categories} />
        <Route path="/add-post" component={AddAudio} />
        <Route path="/login" component={() => <h1>Login</h1>} />
        <Route path="/signup" component={() => <h1>Sign Up</h1>} />
        <Route path="/add-post/:postId" component={AddAudio} />
        <Route path="/:postId" component={SinglePost} />
        <Route path="/" exact component={Posts} />
      </Switch>
    </Layout>
  );
}

export default App;
