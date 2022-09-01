import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-car',
  templateUrl: './admin-car.component.html',
  styleUrls: ['./admin-car.component.css'],
})
export class AdminCarComponent implements OnInit {
  cars: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    let that = this;
    this.adminService.getCars().subscribe({
      next(ret) {
        console.log(ret);
        that.cars = ret.message.cars;
      },
    });
  }
}
