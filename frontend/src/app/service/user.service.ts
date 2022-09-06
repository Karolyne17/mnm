import { Injectable } from '@angular/core';
import { catchError, Observable, tap, map, throwError, of, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { ServiceToken } from './service.token';
import { Users } from '../Classes/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  token:string ="";

  urlBase = "http://localhost:3000/api"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient, private serviceToken: ServiceToken) { }

  connection(data: Users) {
    return this.http.post(this.urlBase + "/signin", data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  inscriptionUser(data: Users) {
    return this.http.post(this.urlBase + '/signup', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  deleteCompte(id:number):Observable<any>{
    console.log('deleteCompte id : ' + id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
    })
    return this.http.delete(this.urlBase + "/membreDelete/" + id, {headers:headers});
  }


  updateAccount(id:any, data:any):Observable<any>{
    console.log('USER-SERVICE updateAccount : ', data);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
    })
    return this.http.post(this.urlBase + "/profile", data, {headers:headers});
  }


  addCar(data:any):Observable<any>{
    console.log('USER-addCar : ', data);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
    })
    return this.http.post(this.urlBase + "/car", data, {headers:headers});
  }


  sendMsg(data:any):Observable<any>{
    console.log('USER-addMsg : ', data);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
    })
    return this.http.post(this.urlBase + "/message", data, {headers:headers});
  }


  getMessages(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
    })
    return this.http.get(this.urlBase + "/messages", {headers:headers});
  }


  deleteMessage(id:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
    })
    return this.http.delete(this.urlBase + "/message/"+id, {headers:headers});
  }

  getMessage(idMessage: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
    })
    return this.http.get(this.urlBase + "/message/"+idMessage, {headers:headers});
  }

  getNotifications(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
    })
    return this.http.get(this.urlBase + "/notifs", {headers:headers});
  }

  sendNotification(data:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
    })
    return this.http.post(this.urlBase + "/notif", data, {headers:headers});
  }

  getNotification(idNotif: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
    })
    return this.http.get(this.urlBase + "/notif/"+idNotif, {headers:headers});
  }


  getUser():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
    })
    return this.http.get(this.urlBase + "/profile", {headers:headers});
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => {
      error.error.mess || error.error;
    })
  }
}
