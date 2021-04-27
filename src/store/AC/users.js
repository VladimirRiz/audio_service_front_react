import * as actions from '../AC/actionTypes';

const fetchUserStart = () => {
  return {
    type: actions.FETCH_USER_START,
  };
};
const fetchUserSuccess = (users) => {
  return {
    type: actions.FETCH_USER_SUCCESS,
    users,
  };
};
const fetchUserFail = (error) => {
  return {
    type: actions.FETCH_USER_SUCCESS,
    error,
  };
};

const updateUserSuccess = () => {
  return {
    type: actions.UPDATE_USER_SUCCESS,
  };
};

export const fetchUser = (token) => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    fetch('http://localhost:8080/auth/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => dispatch(fetchUserSuccess(resData.users)))
      .catch((err) => dispatch(fetchUserFail(err)));
  };
};

export const updateUser = (url, settings, token) => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    fetch(url, settings)
      .then((res) => res.json())
      .then((resData) => {
        dispatch(updateUserSuccess());
        dispatch(fetchUser(token));
      })
      .catch((err) => dispatch(fetchUserFail(err)));
  };
};

export const createUser = (settings, token) => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    fetch('http://localhost:8080/auth/signup', settings)
      .then((res) => res.json())
      .then((resData) => {
        dispatch(fetchUser(token));
      })
      .catch((err) => dispatch(fetchUserFail(err)));
  };
};

export const removeUser = ([userId, token]) => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    fetch(`http://localhost:8080/auth/user/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        dispatch(updateUserSuccess());
        dispatch(fetchUser(token));
      })
      .catch((err) => dispatch(fetchUserFail(err)));
  };
};
