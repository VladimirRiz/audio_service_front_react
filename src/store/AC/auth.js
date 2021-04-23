import * as actions from './actionTypes';

export const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};

export const authSuccess = (token, userId, status) => {
  return {
    type: actions.AUTH_SUCCESS,
    token,
    userId,
    status,
  };
};

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

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
        console.log(resData.expiresIn);
        const expirationDate = new Date(
          new Date().getTime() + resData.expiresIn * 1000
        );
        localStorage.setItem('token', resData.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', resData.userId);
        dispatch(authSuccess(resData.token, resData.userId, resData.status));
        dispatch(setAutoLogout(resData.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(logout());
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    // if (expirationDate <= new Date()) return dispatch(logout());
    const userId = localStorage.getItem('userId');
    dispatch(authSuccess(token, userId));
    dispatch(
      setAutoLogout(expirationDate.getSeconds() - new Date().getSeconds())
    );
  };
};
