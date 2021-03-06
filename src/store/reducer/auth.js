import { updateObject } from '../utility';

import * as actions from '../AC/actionTypes';

const INITIAL_STATE = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  status: null,
  counter: 0,
};

const authStart = (state, action) => {
  return updateObject(state, { loading: true, error: null, status: null });
};
const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    token: action.token,
    userId: action.userId,
    error: null,
    status: action.status,
    counter: 0,
  });
};
const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    token: null,
    userId: null,
    error: action.error,
    status: null,
  });
};

const logout = (state, action) => {
  return updateObject(state, { token: null, userId: null, status: null });
};

const notAuth = (state, action) => {
  return updateObject(state, { counter: state.counter + 1 });
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.AUTH_START:
      return authStart(state, action);
    case actions.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actions.AUTH_FAIL:
      return authFail(state, action);
    case actions.AUTH_LOGOUT:
      return logout(state, action);
    case actions.NOT_AUTH:
      return notAuth(state, action);
    default:
      return state;
  }
};

export default reducer;
