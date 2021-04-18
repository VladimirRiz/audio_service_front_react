import { Switch, Route } from 'react-router-dom';

import './App.css';
import AddAudio from './containers/AddAudio';
import Layout from './hoc/Layout';
import Posts from './containers/Posts';
import SinglePost from './containers/Posts/SinglePost';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/add-post" exact component={AddAudio} />
        <Route path="/:postId" component={SinglePost} />
        <Route path="/" exact component={Posts} />

        {/* <AddAudio /> */}
      </Switch>
    </Layout>
  );
}

export default App;
