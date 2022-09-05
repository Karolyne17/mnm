import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Travel } from 'src/app/Interfaces/travel';
import { User } from 'src/app/Interfaces/user';
import { TravelService } from 'src/app/service/travel.service';
import { DatePipe } from '@angular/common';
import { LocalizedDatePipe } from 'src/app/pipe/localized-date.pipe';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  travels: Array<Travel> = [];
  place: string = '';


  constructor(private router: Router, private travelService: TravelService, private userService: UserService) {
    let that = this;

    console.log("getUser testing", userService.getUser());

    if(!userService.getUser()) {
    that.router.navigate([`/`]);
    }

    this.travelService.getTravels().subscribe({
      next(trav) {
        that.travels = trav.message.travels;
      },
      error(err){
        console.log("ERREUR ICI :" +err);
      }
    });
  }

  fullBook(place:any): boolean {
    if (place <= 0){
      return (true);
    }
    else{
      return (false);
    }

  }

  ngOnInit(): void {
  }

}
