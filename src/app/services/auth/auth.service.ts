import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AUTH_API } from 'src/app/constants/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = null;
  constructor(private http: HttpClient) { 
    this.user = localStorage.getItem('user');
  }

  login = (userData): Observable<any> =>
    this.http.post(AUTH_API.LOGIN, userData).pipe(map(user => this.setAuthUser(user)))

  register = (userData): Observable<any> =>
    this.http.post(AUTH_API.REGISTER, userData)

  setAuthUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    this.user = user;
    return user
  }
  getAuthUser = () => this.user
}
