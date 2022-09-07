import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/Interfaces/booking';
import { Travel } from 'src/app/Interfaces/travel';
import { User } from 'src/app/Interfaces/user';
import { TravelService } from 'src/app/service/travel.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {
  idAcharger: number = 0;
  travel: Travel = {} as Travel;
  participate = false;
  smoker: string ='';
  clim: string ='';
  place: string = '';
  reservationForm: UntypedFormGroup;
  passager: User = {} as User;

  @Input() idTrajet: string ='-1';

  constructor(private router: Router, private travelService: TravelService, private route: ActivatedRoute, private formBuilder:UntypedFormBuilder, private userService: UserService) {
    
    let that = this;
    this.userService.getUser().subscribe({
      next(ret) {
        that.passager = ret.message.user;
      },
      error(err){
        console.log(err);
      }
    });
    this.route.params.subscribe({
      next(val) {
        that.idTrajet = (val["id"])
      }
    });
    this.reservationForm = this.formBuilder.group({
      comment: "" as string
    })


    this.travelService.getTravel(parseInt(that.idTrajet) ).subscribe({
      next(ret) {
        console.log(ret);
        that.travel = ret.message.travel;
        that.participate = ret.message.travel.isAlreadyBooked
        if (that.travel.smoker == true){
          that.smoker = "Véhicule fumeur";
        }
        else{
          that.smoker = "Véhicule non fumeur";
        }
        if (that.travel.airconditionning == true){
          that.clim = "Véhicule climatisé";
        }
        else{
          that.clim = "Véhicule non climatisé";
        }
        if (ret.message.travel.car.placeQuantity <= 0){
          that.place = "Complet";
        }
        else{
          that.place = ret.message.travel.car.placeQuantity;
        }
        
      },
      error(err){
        console.log(err);
      }
    });
  }

  canBook(): boolean {
    return (this.place !== 'Complet' && !this.participate)
  }
  alreadyBook(): boolean {
    return (this.participate)
  }
  fullBook(): boolean {
    return (this.place == 'Complet' && !this.participate)
  }

  validForm() {
    let bookingInfo: Booking = {
      comment: this.reservationForm.value.comment,
      travelId: parseInt(this.idTrajet)
    };
    let that = this;
    this.travelService.addBooking(bookingInfo).subscribe({
      next(res) {
        that.userService.sendNotification({message: `${that.passager.userName} participe à votre voyage : ${bookingInfo.comment}`, id:that.travel.user?.id}).subscribe({
          next(ret) {
            that.router.navigate(['/']).then(() => {
              that.router.navigate(['/accueil']);
            });
          }
        })
      }
    });
  }

  onDelete(){
    let that = this;
    that.travelService.deleteBooking(this.idTrajet).subscribe({
      next(res) {
        that.router.navigate(['/']).then(() => {
          that.router.navigate(['/accueil']);
        });
      }
  });


  }

  ngOnInit(): void {
  }


}
