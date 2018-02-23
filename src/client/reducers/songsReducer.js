import { FETCH_RECOMMENDED_SONGS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_RECOMMENDED_SONGS:
      return { ...state, data: action.payload, status: action.status };
    default:
      return state;
  }
};
