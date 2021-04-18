import { combineReducers } from 'redux';
import posts from './posts';
import post from './post';

const reducer = combineReducers({
  posts: posts,
  post: post,
});

export default reducer;
