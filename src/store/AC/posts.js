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