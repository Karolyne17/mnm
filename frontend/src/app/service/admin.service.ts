import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../Interfaces/user';
import { ServiceToken } from './service.token';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  urlBase = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private serviceToken: ServiceToken) {}

  getUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.serviceToken.tokenValue()}`,
    });
    return this.http.get(this.urlBase + '/admin/users', { headers: headers });
  }

  getCars(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.serviceToken.tokenValue()}`,
    });
    return this.http.get(this.urlBase + '/admin/cars', { headers: headers });
  }

  getTravels(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.serviceToken.tokenValue()}`,
    });
    return this.http.get(this.urlBase + '/admin/travels', { headers: headers });
  }
}
