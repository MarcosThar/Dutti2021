import { createSelector } from "@ngrx/store";
import { Ship } from "src/app/interfaces/ship";

export const selectShips = createSelector(
  (state: {ships}) => state.ships?.results,
  (state: {ships}) => state.ships?.pageSelected,
  (ships, pageSelected) => ships?.[pageSelected]
);
 