import { combineReducers } from 'redux';
import posts from './posts';
import post from './post';
import auth from './auth';

const reducer = combineReducers({
  posts: posts,
  post: post,
  auth: auth,
});

export default reducer;
