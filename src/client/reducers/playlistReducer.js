import { CREATE_PLAYLIST } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_PLAYLIST:
      return { ...state, status: action.status, data: action.payload };
    default:
      return state;
  }
};
