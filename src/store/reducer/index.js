import { combineReducers } from 'redux';
import posts from './posts';
import post from './post';
import auth from './auth';
import playlists from './playlists';
import users from './users';

const reducer = combineReducers({
  posts: posts,
  post: post,
  auth: auth,
  playlists,
  users,
});

export default reducer;
