import { PlaylistAction } from './actions';

interface PAction {
  type: string;
  payload: { [key: string]: any };
}

export function playlistReducer(
  state: { items: [] } = { items: [] },
  action: PAction
): any {
  switch (action.type) {
    case PlaylistAction.ADD_EXISTENTS_PLAYLISTS:
      return { items: [...action.payload.items] };

    case PlaylistAction.ADD_PLAYLIST:
      return { items: [...state.items, action.payload.item] };

    case PlaylistAction.REMOVE_ONE_PLAYLIST:
      const items = state.items.filter((p: any) => p.id !== action.payload.id);
      return { items };

    default:
      return state;
  }
}
