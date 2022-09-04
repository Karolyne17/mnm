import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Travel } from 'src/app/Classes/travel';
import { TravelService } from 'src/app/service/travel.service';

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
  });

  constructor(private formBuilder: UntypedFormBuilder,private router: Router, private travelService: TravelService) { }

  ngOnInit(): void {
  }

  validForm() {
    let data: Travel = {
      latStart: 0,
      longStart: 0,
      dateStart: this.addTravelForm.value.dateStart,
      latArrival: 0,
      longArrival: 0,
      cityStart: this.addTravelForm.value.cityStart,
      cityArrival: this.addTravelForm.value.cityArrival,
      smoker: true,
      airconditionning: true,
      carId: 1,
    }
    console.log(data);

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