import {
  FETCH_CURRENT_USER,
  FETCH_RECOMMENDED_SONGS,
} from './types';

import convertAttributes from '../helpers/convertAttributes';

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  try {
    const res = await api.get('/auth/current_user');
    dispatch({ type: FETCH_CURRENT_USER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecommendedSongs = (mood, danceability, energy) => async (dispatch, getState, api) => {
  dispatch({ type: FETCH_RECOMMENDED_SONGS, status: 'loading' });
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
    dispatch({ type: FETCH_RECOMMENDED_SONGS, status: 'success', payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_RECOMMENDED_SONGS, status: 'error' });
  }
};
