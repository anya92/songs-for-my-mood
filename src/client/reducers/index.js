import { combineReducers } from 'redux';
import authReducer from './authReducer';
import songsReducer from './songsReducer';
import playlistReducer from './playlistReducer';

export default combineReducers({
  auth: authReducer,
  songs: songsReducer,
  playlist: playlistReducer,
});
