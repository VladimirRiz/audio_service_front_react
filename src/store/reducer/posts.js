import { updateObject } from '../utility';

import * as actions from '../AC/actionTypes';

const INITIAL_STATE = {
  posts: [],
  filteredPosts: [],
  loading: false,
  categories: {
    genre: ['Pop', 'Rock', 'Hip-Hop', 'Jazz', 'Latin'],
    other: ['Popular', 'Most Listening'],
  },
};

const fetchPostsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchPostsSuccess = (state, action) => {
  return updateObject(state, {
    posts: action.posts,
    filteredPosts: action.posts,
    loading: false,
  });
};

const fetchPostsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const removePostSuccess = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchPostsCategoryStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchPostsCategorySuccess = (state, action) => {
  return updateObject(state, { loading: false, posts: action.posts });
};
const fetchPostsCategoryFail = (state, action) => {
  return updateObject(state, { posts: action.posts });
};

const setLikeSuccess = (state, action) => {
  const findIndex = state.posts.findIndex(
    (post) => post._id === action.post._id
  );
  const updatedPosts = [...state.posts];
  updatedPosts[findIndex] = action.post;
  return updateObject(state, { filteredPosts: updatedPosts });
};
const setLikeFail = (state, action) => {
  return updateObject(state);
};

const fetchPopularStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchPopularSuccess = (state, action) => {
  return updateObject(state, { posts: action.posts, loading: false });
};

const fetchPopularFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const filter = (state, action) => {
  return updateObject(state, { filteredPosts: action.posts });
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
    case actions.GET_POSTS_CATEGORY_START:
      return fetchPostsCategoryStart(state, action);
    case actions.GET_POSTS_CATEGORY_SUCCESS:
      return fetchPostsCategorySuccess(state, action);
    case actions.GET_POSTS_CATEGORY_FAIL:
      return fetchPostsCategoryFail(state, action);
    case actions.SET_POST_LIKE_SUCCESS:
      return setLikeSuccess(state, action);
    case actions.SET_POST_LIKE_FAIL:
      return setLikeFail(state, action);
    case actions.GET_POPULAR_START:
      return fetchPopularStart(state, action);
    case actions.GET_POPULAR_SUCCESS:
      return fetchPopularSuccess(state, action);
    case actions.GET_POPULAR_FAIL:
      return fetchPopularFail(state, action);
    case actions.FILTER:
      return filter(state, action);
    default:
      return state;
  }
};

export default reducer;
