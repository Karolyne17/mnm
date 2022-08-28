import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { Users } from 'src/app/Classes/user';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  logForm = this.formBuilder.group({
    id:1,
    email: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder,  private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  validForm() {
    let data: Users = {
      id: -1,
      email: this.logForm.value.email,
      password: this.logForm.value.password,
    }
//     userName?: string,
//     lastName?: string,
//     firstName?: string,
//     phoneNumber?: number,
//     email?: string,
    console.log(data);

    let that = this
    this.userService.inscriptionUser(data).subscribe({
      next(ret) {
        that.router.navigate(["/connection"])
      },
      error(err) {
        alert(err);
      }
    })
   }

}
