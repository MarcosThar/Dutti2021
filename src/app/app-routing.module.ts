import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PATHS_FRONT } from './constants/pathsFront';
import { AuthGuard } from './guards/auth-guard.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./pages/login/login.module`).then(m => m.LoginModule)
  },
  {
    path: PATHS_FRONT.register,
    loadChildren: () => import(`./pages/register/register.module`).then(m => m.RegisterModule)
  },
  {
    path: PATHS_FRONT.principal,
    canActivate: [AuthGuard],
    loadChildren: () => import(`./pages/principal/principal.module`).then(m => m.PrincipalModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
