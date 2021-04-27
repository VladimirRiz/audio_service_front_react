import { updateObject } from '../utility';

import * as actions from '../AC/actionTypes';

const INITIAL_STATE = {
  users: [],
  loading: false,
};

const fetchUserStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchUserSuccess = (state, action) => {
  return updateObject(state, { users: action.users, loading: false });
};
const fetchUserFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const updateUserSuccess = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.FETCH_USER_START:
      return fetchUserStart(state, action);
    case actions.FETCH_USER_SUCCESS:
      return fetchUserSuccess(state, action);
    case actions.FETCH_USER_FAIL:
      return fetchUserFail(state, action);
    case actions.UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
