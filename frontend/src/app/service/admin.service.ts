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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('ADMIN_TOKEN') || '';
  }

  getUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get(this.urlBase + '/admin/users', { headers: headers });
  }

  getCars(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get(this.urlBase + '/admin/cars', { headers: headers });
  }

  getTravels(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get(this.urlBase + '/admin/travels', { headers: headers });
  }

  connection(adminInfo: any): Observable<any> {
    return this.http.post(
      this.urlBase + '/admin/login',
      adminInfo,
      this.httpOptions
    );
  }
}
