import { updateObject } from '../utility';

import * as actions from '../AC/actionTypes';

const INITIAL_STATE = {
  post: [],
  loading: false,
  editPost: false,
};

const fetchPostStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchPostSuccess = (state, action) => {
  return updateObject(state, { post: action.post, loading: false });
};
const fetchPostFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const removePost = (state, action) => {
  return updateObject(state, { post: action.post, loading: false });
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.FETCH_POST_START:
      return fetchPostStart(state, action);
    case actions.FETCH_POST_SUCCESS:
      return fetchPostSuccess(state, action);
    case actions.FETCH_POST_FAIL:
      return fetchPostFail(state, action);
    case actions.REMOVE_POST:
      return removePost(state, action);
    default:
      return state;
  }
};

export default reducer;
