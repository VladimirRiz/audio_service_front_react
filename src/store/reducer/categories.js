import { updateObject } from '../utility';

import * as actions from '../AC/actionTypes';

const INITIAL_STATE = {
  categories: [],
  loading: false,
  error: null,
};

const setCategoryStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const setCategorySuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    categories: action.categories,
  });
};
const setCategoryFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SET_CATEGORY_START:
      return setCategoryStart(state, action);
    case actions.SET_CATEGORY_SUCCESS:
      return setCategorySuccess(state, action);
    case actions.SET_CATEGORY_FAIL:
      return setCategoryFail(state, action);
    default:
      return state;
  }
};

export default reducer;
