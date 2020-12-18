import { createStore } from 'redux';
import { playerReducer } from './modules/player/reducer';

export const store = createStore(playerReducer);
