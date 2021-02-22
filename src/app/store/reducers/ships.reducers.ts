import { createReducer, on } from '@ngrx/store';
import {
  setShips,
  cleanShips,
} from '../actions/ships.actions';

export const initialState = null;

const _shipsReducer = createReducer(
  initialState,
  on(setShips, (state, { ships }) => ships),
  on(cleanShips, (state) => initialState)
);

export const shipsReducer = (state, action) =>
  _shipsReducer(state, action)