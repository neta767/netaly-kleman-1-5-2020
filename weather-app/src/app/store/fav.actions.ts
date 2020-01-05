import { Action } from '@ngrx/store';

interface info {
  id: string;
  city: string;
  weatherText: string;
  temCelsius: string;
  temFahrenheit: string;
}

export enum ActionTypes {
  Add = '[Product] Add to fav',
  Remove = '[Product] Remove from fav',
  LoadFavs = '[Products] Load list of fav'
}

export class AddToFav implements Action {
  readonly type = ActionTypes.Add;

  constructor(public payload: info) { }
}

export class RemoveFromFav implements Action {
  readonly type = ActionTypes.Remove;

  constructor(public payload: info) { }
}

export type ActionsUnion = AddToFav | RemoveFromFav;  