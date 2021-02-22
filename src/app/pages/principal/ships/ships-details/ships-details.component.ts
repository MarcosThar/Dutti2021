import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { PaginationControlsComponent } from 'ngx-pagination';
import { requestGetShips } from 'src/app/store/actions/ships.actions';
declare var $: any;


@Component({
  selector: 'ships-details',
  templateUrl: './ships-details.component.html',
  styleUrls: ['./ships-details.component.scss']
})
export class ShipsDetailsComponent implements OnInit {
  @ViewChild(PaginationControlsComponent) paginator: PaginationControlsComponent
  @Input() dataList: any;
  config = {
    id: 'list',
    itemsPerPage: 10,
    currentPage: 1
  };
  shipId: string = '';
  url: string = '';
  // Modal
  titleDetails: string = '';
  modelDetails: string = '';
  starshipClass: string = '';

  constructor(
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
  }


  pageChanged(page) {
    this.store.dispatch(requestGetShips({ page }));
    this.config.currentPage = page;
  }

  openDetails(details) {
    $("#exampleModal").modal('show');
    this.titleDetails = details.name;
    this.modelDetails = details.model;
    this.starshipClass = details.starshipClass
  }

  getStarShipId = (url) =>
    `https://starwars-visualguide.com/assets/img/starships/${url.split('/').splice(-2, 1)
    }.jpg`

  getPaginatorConfig = (dataLis) => ({
    ...this.config,
    totalItems: dataLis.count
  })
}
