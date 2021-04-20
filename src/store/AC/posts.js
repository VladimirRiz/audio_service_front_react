import * as actions from '../AC/actionTypes';

export const fetchPostsStart = () => {
  return {
    type: actions.FETCH_POSTS_START,
  };
};

export const fetchPostsSuccess = (posts) => {
  return {
    type: actions.FETCH_POSTS_SUCCESS,
    posts: posts,
  };
};

export const fetchPostsFail = (err) => {
  return {
    type: actions.FETCH_POSTS_FAIL,
    error: err,
  };
};

export const fetchPosts = () => {
  return (dispatch) => {
    dispatch(fetchPostsStart());
    fetch('http://localhost:8080/feed/posts')
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        const updatedPosts = [];
        resData.posts.map((post) => {
          return updatedPosts.push({
            ...post,
            audio: `http://localhost:8080/${post.audio}`,
          });
        });
        return updatedPosts;
      })
      .then((posts) => {
        dispatch(fetchPostsSuccess(posts));
      })
      .catch((err) => {
        dispatch(fetchPostsFail(err));
      });
  };
};

export const fetchPostsCategoryStart = () => {
  return {
    type: actions.GET_POSTS_CATEGORY_START,
  };
};
export const fetchPostsCategorySuccess = (posts) => {
  return {
    type: actions.GET_POSTS_CATEGORY_SUCCESS,
    posts: posts,
  };
};
export const fetchPostsCategoryFail = (err) => {
  return {
    type: actions.GET_POSTS_CATEGORY_FAIL,
    error: err,
  };
};
export const fetchPostsCategory = (category) => {
  return (dispatch) => {
    dispatch(fetchPostsCategoryStart());
    fetch(`http://localhost:8080/feed/posts/${category}`)
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        dispatch(fetchPostsCategorySuccess(resData.posts));
      })
      .catch((err) => dispatch(fetchPostsCategoryFail(err)));
  };
};

export const removePost = (postId) => {
  return (dispatch) => {
    dispatch(fetchPostsStart());
    fetch(`http://localhost:8080/feed/post/${postId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        dispatch(fetchPosts());
      })
      .catch((err) => dispatch(fetchPostsFail(err)));
  };
};

export const setLikeSuccess = (post) => {
  return {
    type: actions.SET_POST_LIKE_SUCCESS,
    post,
  };
};

export const setLikeFail = (error) => {
  return {
    type: actions.SET_POST_LIKE_FAIL,
    error,
  };
};

export const setLike = (postId) => {
  return (dispatch) => {
    fetch(`http://localhost:8080/feed/post/likes/${postId}`, { method: 'PUT' })
      .then((res) => res.json())
      .then((resData) => {
        // console.log(resData);
        dispatch(setLikeSuccess(resData.post));
      })
      .catch((err) => dispatch(setLikeFail(err)));
  };
};
