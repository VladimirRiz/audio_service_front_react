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

export const removeFromPlaylist = ([postId, token, name]) => {
  return (dispatch) => {
    fetch(`http://localhost:8080/feed/playlist-remove-song/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: name,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => dispatch(fetchPlaylistsSuccess(resData.playlists)))
      .catch((err) => dispatch(fetchPlaylistsFail(err)));
  };
};

export const removePlaylist = ([token, name]) => {
  return (dispatch) => {
    fetch(`http://localhost:8080/feed/playlist-remove/`, {
      method: 'PUT',
      body: JSON.stringify({
        name: name,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => dispatch(fetchPlaylistsSuccess(resData.playlists)))
      .catch((err) => dispatch(fetchPlaylistsFail(err)));
  };
};

export const changeName = (listId, token, formData) => {
  return (dispatch) => {
    fetch(`http://localhost:8080/feed/playlist-name/${listId}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => dispatch(fetchPlaylistsSuccess(resData.playlists)))
      .catch((err) => dispatch(fetchPlaylistsFail(err)));
  };
};
