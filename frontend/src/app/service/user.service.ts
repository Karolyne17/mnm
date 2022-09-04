import { Injectable } from '@angular/core';
import { catchError, Observable, tap, map, throwError, of, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { ServiceToken } from './service.token';
import { Users } from '../Classes/user';
import { Adress } from '../Classes/adress';
//import { User } from './Interfaces/user';
// import { Post } from './post';
// import { Posts } from './classes/post';
// import { Comments } from './classes/comment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // users: Users[];
  // posts: Posts[];
  // comments: Comment[];
  token:string ="";
  // currentUserId:number = -1;

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

  // getUsers(): Observable<Array<Users>> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
  //   })
  //   return this.http.get<Array<Users>>(this.urlBase + '/profile', {headers:headers});
  // }

  getUser():Observable<any>{
    console.log('FONCTION GETUSER : ' );
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
