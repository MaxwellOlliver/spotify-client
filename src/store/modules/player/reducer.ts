import { PlayerAction } from './actions';

interface PAction {
  type: string;
  payload: { [key: string]: any };
}

const initialState = {
  is_playing: false,
  devices: [],
  selected_device: {},
  repeat: 'off',
  shuffle: false,
  volume: 0,
  music: {},
};

export function playerReducer(state: any = initialState, action: PAction): any {
  switch (action.type) {
    case PlayerAction.SET_CURRENTLY_PLAYER:
      return { ...state, ...action.payload };

    case PlayerAction.PLAY:
      return { ...state, is_playing: true };

    case PlayerAction.PAUSE:
      return { ...state, is_playing: false };

    case PlayerAction.REPEAT:
      if (!['off', 'context', 'track'].includes(action.payload.repeat)) {
        return state;
      }

      return { ...state, repeat: action.payload.repeat };

    case PlayerAction.SHUFFLE:
      return { ...state, shuffle: action.payload.shuffle };

    case PlayerAction.SET_DEVICES:
      return { ...state, devices: action.payload.devices };

    case PlayerAction.SET_MUSIC:
      return { ...state, music: action.payload.music };

    case PlayerAction.SET_SELECTED_DEVICE:
      return { ...state, selected_device: action.payload.device };

    case PlayerAction.SET_VOLUME:
      return { ...state, volume: action.payload.volume };

    case PlayerAction.SET_PROGRESS:
      return { ...state, progress: action.payload.progress };

    default:
      return state;
  }
}
