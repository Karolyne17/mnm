import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceToken } from 'src/app/service/service.token';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifs: Array<any>;



  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, public auth: ServiceToken, private tokenService: ServiceToken) {
    this.notifs = [];
  }

  ngOnInit(): void {
    let that = this;
    this.userService.getNotifications().subscribe({
      next(ret: any) {
        that.notifs = ret.message.notifs;
      },
      error(err) {
        console.log(err);
        alert(err);
      }
    })
  }

}

