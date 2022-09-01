import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-travel',
  templateUrl: './admin-travel.component.html',
  styleUrls: ['./admin-travel.component.css'],
})
export class AdminTravelComponent implements OnInit {
  travels: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    let that = this;
    this.adminService.getTravels().subscribe({
      next(ret) {
        console.log(ret);
        that.travels = ret.message.travels;
      },
    });
  }
}
