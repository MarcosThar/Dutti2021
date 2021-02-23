import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate = (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => (
    !!this.authService.getAuthUser() || this.router.navigate([''])
  )

}
