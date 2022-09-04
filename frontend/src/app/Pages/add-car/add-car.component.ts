import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cars } from 'src/app/Classes/cars';
import { Users } from 'src/app/Classes/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  logForm = this.formBuilder.group({
    model: '',
    placeQuantity: '',
    matriculation: '',
    color: ''
  });
  constructor(private formBuilder: UntypedFormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) { }
  ret?: any;
  idAcharger: number = 0;

  ngOnInit(): void {
  }

  validForm() {
    let data: Cars = {
      model: this.logForm.value.model,
      placeQuantity: this.logForm.value.placeQuantity,
      matriculation: this.logForm.value.matriculation,
      color: this.logForm.value.color,
    }

    let that = this;
    this.route.params.subscribe({
      next(val) {
        that.idAcharger = parseInt(val["id"])
      }
    });

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
  goToProfil(){
    let that = this;
    this.route.params.subscribe({
      next(val) {
        that.idAcharger = parseInt(val["id"])
      }
    });
    this.router.navigate([`/user/${this.idAcharger}`]);
  }
}
