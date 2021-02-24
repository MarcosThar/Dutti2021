import { createSelector } from "@ngrx/store";

export const selectShips = createSelector(
  (state: {ships}) => state.ships?.results,
  (state: {ships}) => state.ships?.pageSelected,
  (ships, pageSelected) => ships?.[pageSelected]
);
 