import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  logForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  ret?: any;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  validForm() {
    let data = {
      username: this.logForm.value.username,
      password: this.logForm.value.password,
    };

    let that = this;
    this.adminService.connection(data).subscribe({
      next(ret: any) {
        if (ret.message.pass == true) {
          localStorage.removeItem('admin_id');
          localStorage.setItem('ADMIN_TOKEN', ret.message.token);
          localStorage.setItem('admin_id', ret.message.id);
          console.log(localStorage);
          that.router.navigate([`/admin/users`]);
        } else if (ret.message.pass == false) {
          console.log(ret.message);
        }
      },
      error(err) {
        alert(err);
      },
    });
  }
}
