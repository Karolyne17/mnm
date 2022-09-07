
import { UntypedFormBuilder } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cars } from 'src/app/Classes/cars';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  logForm = this.formBuilder.group({
    model: '',
    placeQuantity: 0,
    matriculation: '',
    color: ''
  });
  constructor(private formBuilder: UntypedFormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) { }
  ret?: any;
  idAcharger: number = 0;

  ngOnInit(): void {
  }

  @ViewChild("alertDiv")
  alertDiv!: ElementRef;

  validForm() {
    let data: Cars = {
      model: this.logForm.value.model,
      placeQuantity: this.logForm.value.placeQuantity,
      matriculation: this.logForm.value.matriculation,
      color: this.logForm.value.color,
    }

    if(data.model == "" || data.placeQuantity == 0 || data.matriculation == "" || data.color == ""){
      this.alertDiv.nativeElement.style.display = "block";
    }else{
      let that = this;
      this.userService.addCar(data).subscribe({
        next(ret: any) {
          that.route.params.subscribe({
          next(val) {
            that.router.navigate([`/user/${that.idAcharger}`]);
          }
          });
        },
        error(err) {
          alert(err);
        }
      })
    }
  }

  goToProfil(){
    this.router.navigate([`/user/${this.idAcharger}`]);
  }
}
