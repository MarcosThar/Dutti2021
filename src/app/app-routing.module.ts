import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./pages/login/login.module`).then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import(`./pages/register/register.module`).then(m => m.RegisterModule)
  },
  {
    path: 'principal',
    loadChildren: () => import(`./pages/principal/principal.module`).then(m => m.PrincipalModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
