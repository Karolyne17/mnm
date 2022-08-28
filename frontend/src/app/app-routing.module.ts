import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionComponent } from './Pages/connection/connection.component';
import { InscriptionComponent } from './Pages/inscription/inscription.component';
import { ProfilComponent } from './Pages/profil/profil.component';

const routes: Routes = [
  { path: "", component: InscriptionComponent },
  { path: "profile", component: ProfilComponent },
  { path: "inscription", component: InscriptionComponent },
  { path: "connection", component: ConnectionComponent },
  // { path: "user/:id", component: UserComponent, canActivate:[AuthentificationGuard]},
  // { path: "user/updateAccount/:id", component: UpdateAccountComponent, canActivate:[AuthentificationGuard]},
  // { path: "user/addPost/:id", component: AddPostComponent, canActivate:[AuthentificationGuard]},
  // { path: "user/:id/:id", component: AddPostComponent, canActivate:[AuthentificationGuard]},
  { path: '', redirectTo:'/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
