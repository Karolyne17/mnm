import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ServiceToken {
  constructor(private route: Router) {}

  public tokenValue() {
    return localStorage.getItem('ACCESS_TOKEN');
  }

  public idValue() {
    return localStorage.getItem('ID');
  }

  public estConnecter() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public seDeconnecter() {
    localStorage.removeItem('ACCESS_TOKEN');
    this.route.navigate(['/connection']);
  }
}
