import { createSelector } from "@ngrx/store";
import { Ship } from "src/app/interfaces/ship";

export const selectShips = createSelector(
  (state: {ships:Ship[]}) => state.ships,
  (ships) => ships
);
 