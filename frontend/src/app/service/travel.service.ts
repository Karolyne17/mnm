import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceToken } from './service.token';
import { Travels } from '../Classes/travel';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  token:string ="";

  urlBase = "http://localhost:3000/api"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http:HttpClient, private serviceToken: ServiceToken) { }


  getTravels():Observable<any>{
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
  })
  return this.http.get(this.urlBase + "/travels", {headers:headers});
  }

  getTravel(id:number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
    })
    return this.http.get(this.urlBase + "/travel/"+id, {headers:headers});
  }

  addBooking(NewBooking:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.serviceToken.tokenValue()}`
    })
    return this.http.post(this.urlBase + "/book/"+NewBooking.travelId, NewBooking, {headers:headers});
  }

}
