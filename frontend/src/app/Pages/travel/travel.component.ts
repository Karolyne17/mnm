import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/Interfaces/booking';
import { Travel } from 'src/app/Interfaces/travel';
import { TravelService } from 'src/app/service/travel.service';
import { MapDirectionsService } from '@angular/google-maps';
import { map, Observable } from 'rxjs';


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

  center: google.maps.LatLngLiteral = {
    lat: 49.106875,
    lng: 6.176651
  };
  zoom = 20;
  directionsResults$: Observable<google.maps.DirectionsResult | undefined>;
  directionsService: google.maps.DirectionsService;
  directionRender: google.maps.DirectionsRenderer;
  map: google.maps.Map | null;

  @Input() idTrajet: string ='-1';

  
  constructor(private router: Router, private travelService: TravelService, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder, mapDirectionsService: MapDirectionsService) {
    let that = this;
    this.directionsResults$ = new Observable;
    this.directionRender = new google.maps.DirectionsRenderer;
    this.directionsService = new google.maps.DirectionsService;
    this.map = null;
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

        const request: google.maps.DirectionsRequest = {
          destination: {
            lat: that.travel.latArrival ? that.travel.latArrival : that.center.lat,
            lng: that.travel.longArrival ? that.travel.longArrival : that.center.lng
          },
          origin: {
            lat: that.travel.latStart ? that.travel.latStart : that.center.lat,
            lng: that.travel.longStart ? that.travel.longStart : that.center.lng
          },
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          // drivingOptions: {
          //   departureTime: new Date(that.travel.dateStart ? that.travel.dateStart : Date.now()),  
          //   trafficModel: google.maps.TrafficModel.OPTIMISTIC
          // }
        };
        that.directionsService.route(request, function(result, status){
          if (status == 'OK'){
            that.directionRender.setDirections(result);
            that.directionRender.setMap(that.map);
          }
          });
        console.log(that.directionRender);
        that.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => response.result));
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
