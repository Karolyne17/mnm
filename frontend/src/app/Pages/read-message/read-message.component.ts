import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceToken } from 'src/app/service/service.token';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-read-message',
  templateUrl: './read-message.component.html',
  styleUrls: ['./read-message.component.css']
})
export class ReadMessageComponent implements OnInit {

  message = {senderName: '', message: '', senderId: ''};
  idMess: string = '0';

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, public auth: ServiceToken, private tokenService: ServiceToken) {
    let that = this;
    this.route.params.subscribe({
      next(val) {
        that.idMess = (val["idmsg"])
      }
    });
  }

  ngOnInit(): void {
    let that = this;
    console.log(this.idMess);
    this.userService.getMessage(this.idMess).subscribe({
      next(ret: any) {
        that.message = ret.message.msg;
        console.log(that.message);
      },
      error(err) {
        console.log(err);
        alert(err);
      }
    })
  }

  delete(): void {
    let that = this;
    this.userService.deleteMessage(this.idMess).subscribe({
      next(ret: any) {
        //redirect to same page
        that.router.navigate(['/message/'+that.tokenService.idValue()]);
      },
      error(err) {
        console.log(err);
        alert(err);
      }
    })
  }

  back(): void {
    this.router.navigate(['/message/'+this.tokenService.idValue()])
  }

  reply(): void {
    this.router.navigate([`/message/${this.message.senderId}/${this.message.senderName}`]);
  }
}
