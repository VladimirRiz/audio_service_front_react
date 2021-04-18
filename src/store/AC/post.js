import * as actions from '../AC/actionTypes';

export const fetchPostStart = () => {
  return {
    type: actions.FETCH_POST_START,
  };
};

export const fetchPostSuccess = (post) => {
  return {
    type: actions.FETCH_POST_SUCCESS,
    post: post,
  };
};

export const fetchPostFail = (err) => {
  return {
    type: actions.FETCH_POST_FAIL,
    error: err,
  };
};

export const fetchPost = (postId) => {
  return (dispatch) => {
    dispatch(fetchPostStart());
    fetch(`http://localhost:8080/feed/post/${postId}`)
      .then((res) => res.json())
      .then((resData) => {
        const updatePost = {
          ...resData.post,
          audio: `http://localhost:8080/${resData.post.audio}`,
        };
        dispatch(fetchPostSuccess(updatePost));
      })
      .catch((err) => {
        dispatch(fetchPostFail(err));
      });
  };
};
