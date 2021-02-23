import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PaginationControlsComponent } from 'ngx-pagination';
import { Ship } from 'src/app/interfaces/ship';


@Component({
  selector: 'ships-details',
  templateUrl: './ships-details.component.html',
  styleUrls: ['./ships-details.component.scss']
})
export class ShipsDetailsComponent implements OnInit {
  @ViewChild(PaginationControlsComponent) paginator: PaginationControlsComponent
  @Input() shipDetails: Ship;

  constructor(
  ) { }

  ngOnInit(): void { }

}
