import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { requestGetShips } from 'src/app/store/actions/ships.actions';
import { selectShips } from 'src/app/store/selectors/ships.selectors';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {
  @ViewChild(ModalComponent) modal : ModalComponent

  public dataList: Observable<any> = this.store.select(selectShips);
  config = {
    id: 'list',
    itemsPerPage: 10,
    currentPage: 1
  };
  details;
  constructor( private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(requestGetShips({}))

  }
  
  pageChanged = (page) => {
    this.store.dispatch(requestGetShips({ page }));
    this.config.currentPage = page;
  }

  openDetails(details) {
    this.details = details
    this.modal.toggle(true)
  }

  getStarShipId = (url) =>
    `https://starwars-visualguide.com/assets/img/starships/${url.split('/').splice(-2, 1)
    }.jpg`

  getPaginatorConfig = (dataLis) => ({
    ...this.config,
    totalItems: dataLis.count
  })
}
