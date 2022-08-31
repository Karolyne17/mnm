import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/Classes/user';
import { User } from 'src/app/Interfaces/user';
import { ServiceToken } from 'src/app/service/service.token';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
idAcharger: number = 0;
  user: User = {} as User;
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
        console.log(ret.message.user);
        that.user = ret.message.user;
      },
      error(err){
        console.log("ERREUR ICI :" +err);
      }
    });

  }

  ngOnInit(): void {
  }

  // delete(){
  //   let that = this;
  //   this.route.params.subscribe({
  //     next(val) {
  //       that.idAcharger = parseInt(val["id"])
  //       console.log(that.idAcharger);

  //       that.userService.deleteCompte(that.idAcharger).subscribe(retour => {that.router.navigate(["/inscription"]);});
  //     }
  //   });
  // }

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

  // logout(){
  //   this.auth.seDeconnecter();
  // }


}
