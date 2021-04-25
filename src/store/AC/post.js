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

export const createPostInit = () => {
  return {
    type: actions.CREATE_POST_INIT,
  };
};

export const createPostStart = () => {
  return {
    type: actions.CREATE_POST_START,
  };
};

export const createPostSuccess = () => {
  return {
    type: actions.CREATE_POST_SUCCESS,
  };
};

export const createPostFail = (err) => {
  return {
    type: actions.CREATE_POST_FAIL,
    error: err,
  };
};

export const createPost = (url, settings) => {
  return (dispatch) => {
    dispatch(createPostStart());
    fetch(url, settings)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(createPostSuccess());
      })
      .catch((err) => {
        dispatch(createPostFail(err));
      });
  };
};

export const editPostStart = (editPost) => {
  return {
    type: actions.EDIT_POST_START,
    editPost: editPost,
  };
};

export const editPostFinish = () => {
  return {
    type: actions.EDIT_POST_FINISH,
  };
};

export const setCommentStart = () => {
  return {
    type: actions.SET_COMMENT_START,
  };
};
export const setCommentSuccess = (post) => {
  return {
    type: actions.SET_COMMENT_SUCCESS,
    post,
  };
};

export const setCommentFail = (error) => {
  return {
    type: actions.SET_COMMENT_FAIL,
    error,
  };
};

export const setComment = (postId, settings) => {
  return (dispatch) => {
    dispatch(setCommentStart());

    fetch(`http://localhost:8080/feed/post/comment/${postId}`, settings)
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        const updatePost = {
          ...resData.post,
          audio: `http://localhost:8080/${resData.post.audio}`,
        };
        dispatch(setCommentSuccess(updatePost));
      })
      .catch((err) => {
        dispatch(setCommentFail(err));
      });
  };
};
