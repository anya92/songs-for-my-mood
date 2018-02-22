import {
  FETCH_CURRENT_USER
} from './types';
import axios from 'axios';

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  console.log('fetching current user');
  try {
    const res = await api.get('/auth/current_user');
    console.log('res', res.data);
    dispatch({ type: FETCH_CURRENT_USER, payload: res.data });
  } catch(error) {
    console.log(error);
  }
};
