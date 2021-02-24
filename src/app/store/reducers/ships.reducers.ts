import { createReducer, on } from '@ngrx/store';
import {
  setShips,
  cleanShips,
} from '../actions/ships.actions';

export const initialState = null;

const setShipsReducer = (state, { ships, page = 1 }) => {
const newState = state?.results ? {...state.results} : {};
newState[page] = ships || newState[page]
  return {
    pageSelected: page,
    results: newState
  }
}

const _shipsReducer = createReducer(
  initialState,
  on(setShips, setShipsReducer),
  on(cleanShips, (state) => initialState)
);


export const shipsReducer = (state, action) =>
  _shipsReducer(state, action)