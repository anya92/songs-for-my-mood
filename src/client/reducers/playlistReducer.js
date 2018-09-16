import {
  CREATE_PLAYLIST_PENDING,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_ERROR,
} from '../actions/types';

const initialState = {
  pending: false,
  data: [],
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PLAYLIST_PENDING:
      return {
        ...state,
        pending: true,
      };
    case CREATE_PLAYLIST_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload,
      };
    case CREATE_PLAYLIST_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
