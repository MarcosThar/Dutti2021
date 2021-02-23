import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AUTH_API } from 'src/app/constants/configAuthApi';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, UserLogin, ResponseAuth } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = null;
  constructor(private http: HttpClient, private router: Router, private toastrService: ToastrService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  login = (userData: UserLogin): Observable<User> =>
    this.http.post<ResponseAuth>(AUTH_API.LOGIN, userData).pipe(
      map((res: ResponseAuth) => this.setAuthUser(res.user)))

  register = (userData: User): Observable<User> =>
    this.http.post<User>(AUTH_API.REGISTER, userData)

  setAuthUser = (user:User): User => {
    localStorage.setItem('user', JSON.stringify(user))
    this.user = user;
    return user
  }

  logout = (): void => {
    this.user = null
    localStorage.removeItem('user');
    this.router.navigate([''])
    this.toastrService.success(
      'Session closed', '', { positionClass: 'toast-bottom-right' }
    );
  }

  getAuthUser = (): User => this.user
}
