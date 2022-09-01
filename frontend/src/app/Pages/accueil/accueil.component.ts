import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Travel } from 'src/app/Interfaces/travel';
import { User } from 'src/app/Interfaces/user';
import { TravelService } from 'src/app/service/travel.service';
import { DatePipe } from '@angular/common';
import { LocalizedDatePipe } from 'src/app/pipe/localized-date.pipe';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  travels: Array<Travel> = [];


  constructor(private router: Router, private travelService: TravelService) {
    let that = this;

    this.travelService.getTravels().subscribe({
      next(trav) {
        console.log(trav);
        that.travels = trav.message.travels;
      },
      error(err){
        console.log("ERREUR ICI :" +err);
      }
    });
  }




  ngOnInit(): void {
  }

}
