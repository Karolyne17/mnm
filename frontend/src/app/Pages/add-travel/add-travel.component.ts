import { UntypedFormBuilder } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cars } from 'src/app/Classes/cars';
import { Travel } from 'src/app/Classes/travel';
import { ServiceToken } from 'src/app/service/service.token';
import { TravelService } from 'src/app/service/travel.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.css']
})
export class AddTravelComponent implements OnInit {
  addTravelForm = this.formBuilder.group({
    dateStart: "",
    cityStart: "",
    cityArrival: "",
    smoker: false,
    airconditionning: true,
    carId: 2,
    price: 0,
  });
  cars: Array<Cars> = [];
  idAcharger: any;


  constructor(private formBuilder: UntypedFormBuilder,private router: Router, private travelService: TravelService, private userService: UserService, private route: ActivatedRoute, public auth: ServiceToken) { 

    let that = this;
    this.route.params.subscribe({next(val) {that.idAcharger = parseInt(val["id"])}});
    this.userService.getUser().subscribe({
      next(ret) {
        console.log(ret)
        that.cars = ret.message.user.cars;
        console.log("voiture des users", ret.message.user.cars)
      },
      error(err){
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @ViewChild("alertDiv")
  alertDiv!: ElementRef;

  validForm() {
    let data: Travel = {
      latStart: 0,
      longStart: 0,
      dateStart: this.addTravelForm.value.dateStart,
      latArrival: 0,
      longArrival: 0,
      cityStart: this.addTravelForm.value.cityStart,
      cityArrival: this.addTravelForm.value.cityArrival,
      smoker: this.addTravelForm.value.smoker,
      airconditionning: this.addTravelForm.value.airconditionning,
      carId: this.addTravelForm.value.carId.id,
      price: this.addTravelForm.value.price
    }
    console.log("form data", data);

    if(data.dateStart == undefined || data.cityStart == "" || data.cityArrival == "" || data.carId == undefined || data.price == undefined){
      this.alertDiv.nativeElement.style.display = "block";
    }
    else{
    let that = this
    this.travelService.addTravel(data).subscribe({
      next(ret) {
        that.router.navigate(["/accueil"])
      },
      error(err) {
        alert(err);
      }
    })
    }
  }
}