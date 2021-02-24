import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ShipPage } from 'src/app/interfaces/ship';
import { ShipsService } from '../../services/ships/ships.service';
import { REQUEST_GET_SHIPS, SET_SHIPS } from '../actions/ships.actions';

@Injectable()
export class ShipsEffects {

    shipsCache = {}

    loadShips$ = createEffect(() => this.actions$.pipe(
        ofType(REQUEST_GET_SHIPS),
        mergeMap(({ page }: any) => (
            this.shipsCache[page] ? of({ type: SET_SHIPS, page }) :
                this.shipsService.getShips(page).pipe(
                    map((ships: ShipPage) =>
                        ({ type: SET_SHIPS, ships: this.setInCache(ships, page), page })),
                    catchError(() => EMPTY)
                ))
        )
    )
    );

    constructor(
        private actions$: Actions,
        private shipsService: ShipsService
    ) { }

    // Se propone esta solucion de codigo para la casuística numero siete por ser menos drástica 
    // Aunque otra posible solución seria almacenar todas la peticiones en el store
    // finalmente se desarrolla la logica para almacenar todas páginas en el store y no 
    // necesitariamos setear los ships aqui pero lo dejo implementado para que se vea que se barajó esta opción
    // con la que no hubiera tenido que modificar el reducer ni el selector pero en el store estan
    // los datos mas controlados y accesibles
    setInCache = (ships: ShipPage, page: number): ShipPage => {
        this.shipsCache[page] = ships
        return ships
    }
}