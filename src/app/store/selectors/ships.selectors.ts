import { createSelector } from "@ngrx/store";

export const selectShips = createSelector(
  (state: any) => state.ships,
  (ships) => ships
);
 