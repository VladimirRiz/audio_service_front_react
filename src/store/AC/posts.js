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

export const fetchPosts = (token) => {
  return (dispatch) => {
    dispatch(fetchPostsStart());
    fetch('http://localhost:8080/feed/posts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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

export const fetchPopularStart = () => {
  return {
    type: actions.GET_POPULAR_START,
  };
};

export const fetchPopularSuccess = (posts) => {
  return {
    type: actions.GET_POPULAR_SUCCESS,
    posts,
  };
};

export const fetchPopularFail = (err) => {
  return {
    type: actions.GET_POPULAR_FAIL,
    error: err,
  };
};

export const fetchPopular = () => {
  return (dispatch) => {
    dispatch(fetchPopularStart());
    fetch('http://localhost:8080/feed/likes')
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        dispatch(fetchPopularSuccess(resData.posts));
      })
      .catch((err) => {
        dispatch(fetchPopularFail(err));
      });
  };
};

export const removePost = (postId, token) => {
  return (dispatch) => {
    dispatch(fetchPostsStart());
    fetch(`http://localhost:8080/feed/post/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const setLike = (postId, token) => {
  return (dispatch) => {
    fetch(`http://localhost:8080/feed/post/likes/${postId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        dispatch(setLikeSuccess(resData.post));
      })
      .catch((err) => dispatch(setLikeFail(err)));
  };
};

export const setPlaysSuccess = (post) => {
  return {
    type: actions.SET_AUDIO_LISTEN_SUCCESS,
    post: post,
  };
};

export const setPlaysFail = (post) => {
  return {
    type: actions.SET_AUDIO_LISTEN_FAIL,
    post: post,
  };
};

export const setPlays = (postId, token) => {
  return (dispatch) => {
    fetch(`http://localhost:8080/feed/post/plays/${postId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        dispatch(setPlaysSuccess(resData.post));
      })
      .catch((err) => dispatch(setPlaysFail(err)));
  };
};

export const filter = (posts) => {
  return {
    type: actions.FILTER,
    posts,
  };
};
