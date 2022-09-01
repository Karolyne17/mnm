import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/Classes/user';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    let that = this;
    this.adminService.getUsers().subscribe({
      next(ret) {
        console.log(ret);
        that.users = ret.message.users;
      },
    });
  }

  getUsers(): any {
    // console.log(this.adminService.getUsers());
    return 'PROUT';
  }
}
