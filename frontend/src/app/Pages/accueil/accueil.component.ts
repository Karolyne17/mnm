import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Travel } from 'src/app/Interfaces/travel';
import { User } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  travels: Array<Travel> = [];
  driver: User = {
    userName: '',
    photo: '',
    id: -1
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
