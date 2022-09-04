import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/Classes/message';
import { ServiceToken } from 'src/app/service/service.token';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {
  idAcharger: number = 0;
  ret?: any;
  logForm = this.formBuilder.group({
    message: '',
  });
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute, private tokenService: ServiceToken) { }


  ngOnInit(): void {
  }

  validForm() {
    let that = this;
    this.route.params.subscribe({
      next(val) {
        that.idAcharger = parseInt(val["id"])
      }
    });

    let data: Message = {
      message: this.logForm.value.message,
      id: this.idAcharger,
    }

    this.userService.sendMsg(data).subscribe({
      next(ret: any) {
        that.route.params.subscribe({
        next(val) {
          let myId = that.tokenService.idValue();
          that.router.navigate([`/user/${myId}`]);
        }
        });
      },
      error(err) {
        alert(err);
      }
    })
  }

  goToProfil(){
    //il faut l'id de celui qui envoie le mess en param
    //this.router.navigate([`/user/${this.idAcharger}`]);
  }
}
