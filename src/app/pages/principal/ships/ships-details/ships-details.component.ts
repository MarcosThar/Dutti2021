import { Component, OnInit, Input } from '@angular/core';
declare var $: any;


@Component({
  selector: 'ships-details',
  templateUrl: './ships-details.component.html',
  styleUrls: ['./ships-details.component.scss']
})
export class ShipsDetailsComponent implements OnInit {

  @Input() dataList: any;
  config = {
    itemsPerPage: 10,
    currentPage: 1,
  };
  shipId: string = '';
  url: string = '';
  // Modal
  titleDetails: string = '';
  modelDetails: string = '';
  starshipClass: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }
  

  pageChanged(event) {
    this.config.currentPage = event;
  }

  openDetails(details) {
    $("#exampleModal").modal('show');
    this.titleDetails = details.name;
    this.modelDetails = details.model;
    this.starshipClass = details.starshipClass
  }

  getStarShipId = (url) => 
      `https://starwars-visualguide.com/assets/img/starships/${
        url.split('/').splice(-2, 1)
      }.jpg`

}
