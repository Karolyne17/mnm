import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adress } from 'src/app/Classes/adress';
import { Bookings } from 'src/app/Classes/bookings';
import { Cars } from 'src/app/Classes/cars';
import { Travel } from 'src/app/Classes/travel';
import { User } from 'src/app/Interfaces/user';
import { ServiceToken } from 'src/app/service/service.token';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  idAcharger: number = 0;
  user: User = {} as User;
  address: Adress = {} as Adress;
  cars: Array<Cars> = [];
  myTravels: Array<Travel> = [];
  myBookings: Array<Travel> = [];
  nav:any;

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, public auth: ServiceToken) {
    let that = this;
    this.route.params.subscribe({next(val) {that.idAcharger = parseInt(val["id"])}});
    this.userService.getUser(that.idAcharger).subscribe({
      next(ret) {
        that.user = ret.message.user;
        that.address = ret.message.user.address;
        that.cars = ret.message.user.cars;
        that.myTravels = ret.message.user.myTravels;
        that.myBookings = ret.message.user.myBookings;
      },
      error(err){
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
  }

  delete(){
    let that = this;
    this.route.params.subscribe({
      next(val) {
        that.idAcharger = parseInt(val["id"])
        console.log(that.idAcharger);

        that.userService.deleteCompte(that.idAcharger).subscribe(retour => {that.router.navigate(["/inscription"]);});
      }
    });
  }

    goToUpdate(){
      this.nav = this.router.navigate([`/user/updateAccount/${this.idAcharger}`]);
  }

}
