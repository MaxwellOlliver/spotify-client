import { combineReducers } from 'redux';
import { playerReducer } from './player/reducer';
import { playlistReducer } from './playlist/reducer';

export const rootReducer = combineReducers({
  player: playerReducer,
  playlists: playlistReducer,
});
