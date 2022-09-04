import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceToken } from 'src/app/service/service.token';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, public auth: ServiceToken) { }

  ngOnInit(): void {
  }

  // goToMessage(id:number){
  //   this.router.navigate([`/message/${id}`]);
  // }
}
