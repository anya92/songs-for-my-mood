import {
  FETCH_CURRENT_USER,
} from './types';


export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  try {
    const res = await api.get('/auth/current_user');
    dispatch({ type: FETCH_CURRENT_USER, payload: res.data });
  } catch(error) {
    console.log(error);
  }
};
