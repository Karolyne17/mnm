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
  messages: Array<any>;
  truncateLimit:number = 20;

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, public auth: ServiceToken, private tokenService: ServiceToken) {
    this.messages = [];
  }

  ngOnInit(): void {
    let that = this;
    this.userService.getMessages().subscribe({
      next(ret: any) {
        that.messages = ret.message.messages;
      },
      error(err) {
        console.log(err);
        alert(err);
      }
    })
  }

  goToMessage(id:string){
     this.router.navigate([`/msg/${id}`]);
  }

  deleteMessage(id: string): void {
    let that = this;
    this.userService.deleteMessage(id).subscribe({
      next(ret: any) {
        //redirect to same page
        that.router.navigate(['/']).then(() => {
          that.router.navigate(['/message/'+that.tokenService.idValue()]);
        });
      },
      error(err) {
        console.log(err);
        alert(err);
      }
    })
  }

}
