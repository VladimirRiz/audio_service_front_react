import { combineReducers } from 'redux';
import posts from './posts';
import post from './post';
import auth from './auth';
import playlists from './playlists';
import users from './users';
import categories from './categories';

const reducer = combineReducers({
  posts: posts,
  post: post,
  auth: auth,
  playlists,
  users,
  categories,
});

export default reducer;
