import { updateObject } from '../utility';

import * as actions from '../AC/actionTypes';

const INITIAL_STATE = {
  posts: [],
  loading: false,
};

const fetchPostsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchPostsSuccess = (state, action) => {
  return updateObject(state, { posts: action.posts, loading: false });
};

const fetchPostsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const removePostSuccess = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.FETCH_POSTS_START:
      return fetchPostsStart(state, action);
    case actions.FETCH_POSTS_SUCCESS:
      return fetchPostsSuccess(state, action);
    case actions.FETCH_POSTS_FAIL:
      return fetchPostsFail(state, action);
    case actions.REMOVE_POST_SUCCESS:
      return removePostSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
