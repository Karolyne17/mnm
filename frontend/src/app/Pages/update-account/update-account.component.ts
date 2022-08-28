import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Adress } from 'src/app/Classes/adress';
import { Users } from 'src/app/Classes/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
prenom="";
  id = localStorage["id"];
  idPage:number= 0;
  idAcharger: number = 0;
  updateAccount: FormGroup;
  user: Users = {
    userName: '',
    lastName: '',
    firstName: '',
    phoneNumber: 0,
    email: '',
    photo: '',
    searchingZone: '',
    id: -1,
  };
  adress: Adress = {
    number: '',
    lineA: '',
    zipCode: '',
    city: '',
    id: -1,
  }


  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.updateAccount = this.formBuilder.group({
      userName: '' as string,
      lastName: '' as string,
      firstName: '' as string,
      phoneNumber: 0 as number,
      email: '' as string,
      photo: '' as string,
      searchingZone: '' as string,
      number: '' as string,
      lineA: '' as string,
      zipCode: '' as string,
      city: '' as string,
    });

    let that = this;
    this.route.params.subscribe({
      next(val) {
        that.idAcharger = parseInt(val["id"])
      }
    });

    this.userService.getUser(that.idAcharger).subscribe({
      next(ret) {
        let data;
        for(let use of Object.keys(ret)){
          data = ret[use];
        }
        that.user = data;
      },
      error(err){
        console.log(err);
      }
    });
  }




  // validForm() {
  //   let dataUpdate: Users = {
  //     id: this.idAcharger,
  //     userName: this.updateAccount.value.userName,
  //     lastName: this.updateAccount.value.lastName,
  //     firstName: this.updateAccount.value.firstName,
  //     phoneNumber: this.updateAccount.value.phoneNumber,
  //     email: this.updateAccount.value.email,
  //     photo: this.updateAccount.value.photo,
  //     searchingZone: this.updateAccount.value.searchingZone,
  //   };

  //   let that = this;
  //   this.route.params.subscribe({
  //     next(val) {
  //       that.idAcharger = parseInt(val["id"])
  //     }
  //   });

  //   this.userService.updateAccount(that.idAcharger, dataUpdate).
  //   subscribe(retour => {
  //     let that = this;
  //     that.route.params.subscribe({
  //       next(val) {
  //         that.idAcharger = parseInt(val["id"])
  //         that.router.navigate([`/user/${that.idAcharger}`]);
  //       }
  //     });
  //   });
  // }

  ngOnInit(): void {
    // let that = this;
    // this.route.params.subscribe({
    //   next(val) {
    //     that.idAcharger = parseInt(val["id"])
    //   }
    // });
    // this.userService.getUser(this.idAcharger).subscribe({
    //   next(ret) {
    //     console.log(ret);
    //     let data="";
    //     let that=this;
    //     for(let use of Object.keys(ret)){
    //       data = ret[use];
    //     }
    //     that.user = data;
    //     that.updateAccount.setValue({
    //       nom:that.user.nom,
    //       prenom:that.user.prenom,
    //       email:that.user.email,
    //       motPasse:that.user.motPasse,
    //       photo:that.user.photo
    //     })
    //   },
    //   error(err){
    //     console.log(err);
    //   }
    // });
  }

  // retourCompte(){
  //   let that = this;
  //   let idPage = 0;
  //   this.route.params.subscribe({
  //     next(val) {
  //       that.idAcharger = parseInt(val["id"])
  //       idPage = that.idAcharger;
  //     }
  //   });
  //   this.router.navigate([`/user/${idPage}`])
  // }


}
