import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AUTH_API } from 'src/app/constants/configAuthApi';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = null;
  constructor(private http: HttpClient, private router: Router, private toastrService: ToastrService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  login = (userData): Observable<any> =>
    this.http.post(AUTH_API.LOGIN, userData).pipe(map(user => this.setAuthUser(user)))

  register = (userData): Observable<any> =>
    this.http.post(AUTH_API.REGISTER, userData)

  setAuthUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.removeItem('user')
    this.user = user;
    return user
  }

  logout = () => {
    this.user = null
    localStorage.removeItem('user');
    this.router.navigate([''])
    this.toastrService.success(
      'Session closed', '', { positionClass: 'toast-bottom-right' }
    );
  }

  getAuthUser = () => this.user
}
