import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { requestGetShips } from 'src/app/store/actions/ships.actions';
import { selectShips } from 'src/app/store/selectors/ships.selectors';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {

  public dataList: Observable<any> = this.store.select(selectShips);

  constructor( private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(requestGetShips({page:2}))

  }
}
