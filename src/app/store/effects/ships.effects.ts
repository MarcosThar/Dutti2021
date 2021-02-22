import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ShipsService } from '../../services/ships/ships.service';
import { REQUEST_GET_SHIPS, SET_SHIPS } from '../actions/ships.actions';

@Injectable()
export class ShipsEffects {

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(REQUEST_GET_SHIPS),
        mergeMap(({ page }: any) =>
            this.shipsService.getShips(page).pipe(
                map(ships => ({ type: SET_SHIPS, ships })),
                catchError(() => EMPTY)
            )
        )
    )
    );

    constructor(
        private actions$: Actions,
        private shipsService: ShipsService
    ) { }
}