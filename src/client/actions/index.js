import * as types from './types';

import convertAttributes from '../helpers/convertAttributes';

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  try {
    const res = await api.get('/auth/current_user');
    dispatch({ type: types.FETCH_CURRENT_USER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecommendedSongs = (mood, danceability, energy) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_RECOMMENDED_SONGS_PENDING });
  try {
    const {
      min_valence,
      max_valence,
      min_danceability,
      max_danceability,
      min_energy,
      max_energy,
    } = convertAttributes(mood, danceability, energy);

    const res = await api({
      method: 'get',
      url: '/api/recommended_songs',
      params: {
        min_valence,
        max_valence,
        min_danceability,
        max_danceability,
        min_energy,
        max_energy,
      },
    });
    dispatch({ type: types.FETCH_RECOMMENDED_SONGS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.FETCH_RECOMMENDED_SONGS_ERROR, payload: error.message });
  }
};

export const createPlaylist = uris => async (dispatch, getState, api) => {
  dispatch({ type: types.CREATE_PLAYLIST_PENDING });
  try {
    const response = await api({
      url: '/api/create_playlist',
      method: 'get',
      params: {
        uris,
      },
    });
    dispatch({ type: types.CREATE_PLAYLIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.CREATE_PLAYLIST_ERROR, payload: error.message });
  }
};
