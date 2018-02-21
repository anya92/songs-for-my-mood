import {
  FETCH_CURRENT_USER
} from './types';
import axios from 'axios';

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await axios.get('/auth/current_user');
  console.log(res);
  dispatch({ type: FETCH_CURRENT_USER, payload: res.data });
}
