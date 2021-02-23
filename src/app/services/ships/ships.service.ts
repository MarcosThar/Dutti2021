import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ShipPage } from 'src/app/interfaces/ship';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  url: string = 'http://swapi.dev/api/starships/?page='
  headerDict = {
    'Authorization': 'none',
    'Access-Control-Allow-Origin': '*'
  }
  requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict), 
  };
  
  constructor( private http: HttpClient ) {}

  getShips(page?: number): Observable<ShipPage>{
    return this.http.get<ShipPage>(`${this.url}${page || 1}`)
  }
}
