import { updateObject } from '../utility';

import * as actions from '../AC/actionTypes';

const INITIAL_STATE = {
  playlists: [],
  error: null,
};

const setToPlaylistSuccess = (state, action) => {
  return updateObject(state, { playlists: action.playlists, error: null });
};
const setToPlaylistError = (state, action) => {
  return updateObject(state, { playlists: null, error: action.error });
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.FETCH_PLAYLISTS_SUCCESS:
      return setToPlaylistSuccess(state, action);
    case actions.FETCH_PLAYLISTS_FAIL:
      return setToPlaylistError(state, action);
    default:
      return state;
  }
};

export default reducer;
