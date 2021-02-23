import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipsComponent } from './ships/ships.component';
import { PageOneComponent } from './page-one/page-one.component';
import { PageTwoComponent } from './page-two/page-two.component';
import { PrincipalComponent } from './principal.component';
import { PATHS_FRONT } from 'src/app/constants/pathsFront';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [
      {
        path: '',
        redirectTo: PATHS_FRONT.ships,
        pathMatch: 'full'
      },
      {
        path: PATHS_FRONT.ships,
        component: ShipsComponent
      },
      {
        path: PATHS_FRONT.pageOne,
        component: PageOneComponent
      },
      {
        path: PATHS_FRONT.pageTwo,
        component: PageTwoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalComponentsRoutingModule { }