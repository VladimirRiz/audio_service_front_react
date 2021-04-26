import * as actions from './actionTypes';

const fetchPlaylistsSuccess = (playlists) => {
  return {
    type: actions.FETCH_PLAYLISTS_SUCCESS,
    playlists,
  };
};

const fetchPlaylistsFail = (error) => {
  return {
    type: actions.FETCH_PLAYLISTS_FAIL,
    error,
  };
};

export const fetchPlaylists = (userId) => {
  return (dispatch) => {
    fetch(`http://localhost:8080/feed/playlists/${userId}`)
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData.playlists);
        dispatch(fetchPlaylistsSuccess(resData.playlists));
      })
      .catch((err) => dispatch(fetchPlaylistsFail(err)));
  };
};

export const setToPlaylist = ([postId, token]) => {
  return (dispatch) => {
    fetch(`http://localhost:8080/feed/playlists/${postId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => dispatch(fetchPlaylistsSuccess(resData.playlists)))
      .catch((err) => dispatch(fetchPlaylistsFail(err)));
  };
};
