import { Injectable } from '@angular/core';
import { catchError, Observable, tap, map, throwError, of, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { ServiceToken } from './service/service.token';
import { Users } from './Classes/user';
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

  // addComment(data: Comments) {
  //   console.log('addcomment id : ' + data.id_2);
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
  //   })
  //   return this.http.post(this.urlBase + '/createComment', data, {headers:headers})
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  // }

  // getComment(id:number):Observable<any>{
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
  //   })
  //   console.log('FONCTION GETCOMMENT : ' + id);
  //     return this.http.get(this.urlBase + "/comment/"+id, {headers:headers});
  // }

  // getComments(): Observable<Array<Comment>> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
  //   })
  //   return this.http.get<Array<Comment>>(this.urlBase + '/multipleComments', {headers:headers});
  // }


  // addPost(data: Posts) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
  //   })
  //   return this.http.post(this.urlBase + '/createPost', data, {headers:headers})
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  // }

  // updatePost(id, updatePostData:any):Observable<any>{
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.token}`
  //   })
  //   return this.http.put(this.urlBase + "/updatePost/" + id, updatePostData.pouce, {headers:headers});
  // }

  deleteCompte(id:number):Observable<any>{
    console.log('deleteCompte id : ' + id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.delete(this.urlBase + "/membreDelete/" + id, {headers:headers});
  }

  updateAccount(id:any, data:any):Observable<any>{
    // console.log('USER-SERVICE updateAccount - upUser : '+id);
    // console.log('USER-SERVICE updateAccount - upUser.nom : '+data.nom);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.put(this.urlBase + "/membreUpdate/" + id, data, {headers:headers});
  }

  // getPosts(): Observable<Array<Posts>>{
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
  //   })
  //   return this.http.get<Array<Posts>>(this.urlBase + '/multiplePosts', {headers:headers});
  // }

  // getPost(id:number):Observable<any>{
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
  //   })
  //   console.log('FONCTION GETPOST : ' + id);
  //     return this.http.get(this.urlBase + "/post/"+id, {headers:headers});
  // }


  getUsers(): Observable<Array<Users>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
    })
    return this.http.get<Array<Users>>(this.urlBase + '/multipleMembre', {headers:headers});
  }

  getUser(id:number):Observable<any>{
  // console.log('FONCTION GETUSER : ' + id);
    return this.http.get(this.urlBase + "/membre/"+id);
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
