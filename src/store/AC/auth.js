import * as actions from './actionTypes';

export const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actions.AUTH_SUCCESS,
    token,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  return {
    type: actions.AUTH_LOGOUT,
  };
};

export const setAutoLogout = (milliseconds) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, milliseconds * 1000);
  };
};

export const auth = (url, settings) => {
  return (dispatch) => {
    dispatch(authStart());
    fetch(url, settings)
      .then((res) => {
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        dispatch(authSuccess(resData.token, resData.userId));
        dispatch(setAutoLogout(resData.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
