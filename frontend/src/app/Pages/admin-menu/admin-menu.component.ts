import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css'],
})
export class AdminMenuComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {}

  public logout() {
    console.log('loguto');
    localStorage.removeItem('ADMIN_TOKEN');
    this.route.navigate(['/']);
  }
}
