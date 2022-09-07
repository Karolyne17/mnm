import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/Classes/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})

export class ConnectionComponent implements OnInit {
  logForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(private formBuilder: UntypedFormBuilder, private userService: UserService, private router: Router) { }
  ret?: any;

  ngOnInit(): void {

  }

  validForm() {
    let data: Users = {
      email: this.logForm.value.email,
      password: this.logForm.value.password,
    }

    let that = this
    this.userService.connection(data).subscribe({
      next(ret: any) {

          if (ret.message.pass == true) {
            localStorage.removeItem('ID');
            localStorage.setItem('ACCESS_TOKEN', ret.message.token);
            localStorage.setItem('id', ret.message.id);
            console.log(localStorage);
            that.router.navigate([`/user/${ret.message.id}`]);
            that.router.navigate([`/accueil`]);


          }else if(ret.message.pass == false){
            console.log(ret.message);
          }
      },
      error(err) {
        alert(err);
      }
    })
  }


}
