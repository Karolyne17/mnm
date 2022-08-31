import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/Interfaces/booking';
import { Travel } from 'src/app/Interfaces/travel';
import { TravelService } from 'src/app/service/travel.service';

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
  reservationForm: FormGroup;

  @Input() idTrajet: string ='-1';

  constructor(private router: Router, private travelService: TravelService, private route: ActivatedRoute, private formBuilder:FormBuilder) {
    let that = this;
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
        that.participate = ret.message.travel
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

  getVisibility(): boolean {
    return !(this.place == 'Complet' || this.travel.smoker)
  }

  validForm() {
    console.log(this.reservationForm.value);
    let bookingInfo: Booking = {
      comment: this.reservationForm.value.comment,
      travelId: parseInt(this.idTrajet)
    };
    let that = this;
    this.travelService.addBooking(bookingInfo).subscribe({
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
