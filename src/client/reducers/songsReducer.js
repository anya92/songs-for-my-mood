import {
  FETCH_RECOMMENDED_SONGS_PENDING,
  FETCH_RECOMMENDED_SONGS_SUCCESS,
  FETCH_RECOMMENDED_SONGS_ERROR,
} from '../actions/types';

const initialState = {
  pending: false,
  data: [],
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECOMMENDED_SONGS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_RECOMMENDED_SONGS_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload,
      };
    case FETCH_RECOMMENDED_SONGS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
