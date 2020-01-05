import { ActionsUnion, ActionTypes } from './fav.actions';

export const initialState = {
  fav: []
};

export function favReducer(state = initialState, action: ActionsUnion) {
  switch (action.type) {
    case ActionTypes.Add:
      return {
        ...state,
        fav: [...state.fav, action.payload]
      };

    case ActionTypes.Remove:
      return {
        ...state,
        fav: [...state.fav.filter(item => item.id !== action.payload.id)]
      };

    default:
      return state;
  }
}