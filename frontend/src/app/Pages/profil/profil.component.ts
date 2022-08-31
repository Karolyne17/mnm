import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adress } from 'src/app/Classes/adress';
import { Users } from 'src/app/Classes/user';
import { User } from 'src/app/Interfaces/user';
import { ServiceToken } from 'src/app/service/service.token';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
idAcharger: number = 0;
  user: User = {} as User;
  adress: Adress = {} as Adress;
  nav:any;
  //unUser:User;
  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, public auth: ServiceToken) {
    let that = this;
    this.route.params.subscribe({
      next(val) {
        that.idAcharger = parseInt(val["id"])
      }
    });

    this.userService.getUser(that.idAcharger).subscribe({
      next(ret) {
        that.user = ret.message.user;
      },
      error(err){
        console.log(err);
      }
    });
    this.userService.getAdress(that.idAcharger).subscribe({
      next(ret) {
        that.adress = ret.message.adress;
        console.log('adress : ' , that.adress)
      },
      error(err){
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
  }

  delete(){
    let that = this;
    this.route.params.subscribe({
      next(val) {
        that.idAcharger = parseInt(val["id"])
        console.log(that.idAcharger);

        that.userService.deleteCompte(that.idAcharger).subscribe(retour => {that.router.navigate(["/inscription"]);});
      }
    });
  }

  // updateAccount(){
  //   let that = this;
  //   this.route.params.subscribe({
  //     next(val) {
  //       that.idAcharger = parseInt(val["id"])
  //     }
  //   });
  //   this.router.navigate([`/user/updateAccount/${that.idAcharger}`]);
  // }

  // addPost(){
  //   let that = this;
  //   this.route.params.subscribe({
  //     next(val) {
  //       that.idAcharger = parseInt(val["id"])
  //     }
  //   });
  //   this.router.navigate([`/user/addPost/${that.idAcharger}`]);
  // }

    goToUpdate(){
      this.nav = this.router.navigate([`/user/updateAccount/${this.idAcharger}`]);
  }

  // logout(){
  //   this.auth.seDeconnecter();
  // }


}
