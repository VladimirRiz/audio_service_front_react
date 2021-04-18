import { updateObject } from '../utility';

import * as actions from '../AC/actionTypes';

const INITIAL_STATE = {
  post: [],
  loading: false,
  editPost: false,
  redirect: false,
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

const createPostInit = (state, action) => {
  return updateObject(state, { redirect: false });
};

const createPostStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const createPostSuccess = (state, action) => {
  return updateObject(state, { loading: false, redirect: true });
};
const createPostFail = (state, action) => {
  return updateObject(state, { loading: false, redirect: false });
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.FETCH_POST_START:
      return fetchPostStart(state, action);
    case actions.FETCH_POST_SUCCESS:
      return fetchPostSuccess(state, action);
    case actions.FETCH_POST_FAIL:
      return fetchPostFail(state, action);
    case actions.CREATE_POST_INIT:
      return createPostInit(state, action);
    case actions.CREATE_POST_START:
      return createPostStart(state, action);
    case actions.CREATE_POST_SUCCESS:
      return createPostSuccess(state, action);
    case actions.CREATE_POST_FAIL:
      return createPostFail(state, action);
    default:
      return state;
  }
};

export default reducer;
