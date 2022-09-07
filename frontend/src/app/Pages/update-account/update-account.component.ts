import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Adress } from 'src/app/Classes/adress';
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
  nav:any;
  prenom="";
  idAcharger: number = 0;
  updateAccount: UntypedFormGroup;
  user: User = {} as User;
  address: Adress = {} as Adress;
  data:any;


  constructor(private formBuilder: UntypedFormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) {

    let that = this;
    this.route.params.subscribe({next(val) {that.idAcharger = parseInt(val["id"])}});
    this.userService.getUser().subscribe({
      next(ret) {
        that.user = ret.message.user ? ret.message.user : "";
        that.address = ret.message.address ? ret.message.address : "";
      },
      error(err){
        console.log(err);
      }
    });
    this.updateAccount = this.formBuilder.group({
      userName: '' as string,
      lastName: '' as string,
      firstName: '' as string,
      phoneNumber: 0 as number,
      email: '' as string,
      photo: '' as string,
      searchingZone: 0 as number,
      number: '' as string,
      lineA: '' as string,
      zipCode: '' as string,
      city: '' as string,
    });
  }

  validForm() {
    let dataUpdate:any = {
      id: this.idAcharger,
      userName: this.updateAccount.value.userName,
      lastName: this.updateAccount.value.lastName,
      firstName: this.updateAccount.value.firstName,
      phoneNumber: this.updateAccount.value.phoneNumber,
      email: this.updateAccount.value.email,
      photo: this.updateAccount.value.photo,
      searchingZone: this.updateAccount.value.searchingZone,
      number: this.updateAccount.value.number,
      lineA: this.updateAccount.value.lineA,
      zipCode: this.updateAccount.value.zipCode,
      city: this.updateAccount.value.city,
    };

    let that = this;
    this.route.params.subscribe({
      next(val) {
        that.idAcharger = parseInt(val["id"])
      }
    });

    this.userService.updateAccount(that.idAcharger, dataUpdate).
    subscribe(retour => {
      let that = this;
      that.route.params.subscribe({
        next(val) {
          that.router.navigate([`/user/${that.idAcharger}`]);
        }
      });
    });
  }

  ngOnInit(): void {
    let that = this;
    this.route.params.subscribe({next(val) {that.idAcharger = parseInt(val["id"])}});
    this.userService.getUser().subscribe({
      next(ret) {
        console.log("RETOUR ngOninit : " , ret);
        that.data = ret.message.user;
        that.updateAccount.setValue({
          userName:that.data.userName,
          lastName:that.data.lastName,
          firstName:that.data.firstName,
          phoneNumber:that.data.phoneNumber,
          email:that.data.email,
          photo:that.data.photo,
          searchingZone:that.data.searchingZone,
          number:that.data.address.number,
          lineA:that.data.address.lineA,
          zipCode:that.data.address.zipCode,
          city:that.data.address.city,
        })
      },
      error(err){
        console.log("ici", err);
      }
    });

  }

  goToProfil(){
    this.router.navigate([`/user/${this.idAcharger}`]);
  }
}
