import { createStore } from 'redux';
import { playerReducer } from './modules/player/reducer';
import { rootReducer } from './modules/root';

export const store = createStore(rootReducer);
