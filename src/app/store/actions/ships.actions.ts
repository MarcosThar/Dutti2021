import { createAction, props } from '@ngrx/store';
import { Ship } from 'src/app/interfaces/ship';
 const BASE_PATH = '@Ships/';
 export const REQUEST_GET_SHIPS = `${BASE_PATH}/REQUEST_GET`
 export const SET_SHIPS = `${BASE_PATH}/SET`
 export const CLEAN_SHIPS = `${BASE_PATH}/CLEAN`

export const requestGetShips = createAction(
  REQUEST_GET_SHIPS,
  props<{ page?:number }>()
);
 
export const setShips = createAction(
  SET_SHIPS,
  props<{ ships:Ship[], page }>()
);
 
export const cleanShips = createAction(
  CLEAN_SHIPS
);