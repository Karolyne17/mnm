import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guard/auth.guard';
import { ConnectionComponent } from './Pages/connection/connection.component';
import { InscriptionComponent } from './Pages/inscription/inscription.component';
import { ProfilComponent } from './Pages/profil/profil.component';
import { UpdateAccountComponent } from './Pages/update-account/update-account.component';

const routes: Routes = [
  { path: "", component: InscriptionComponent },
  { path: "inscription", component: InscriptionComponent },
  { path: "connection", component: ConnectionComponent },
  { path: "profile", component: ProfilComponent },
  // { path: "user/:id", component: UserComponent, canActivate:[AuthentificationGuard]},
  { path: "user/updateAccount/:id", component: UpdateAccountComponent, canActivate:[AuthGuard]},
  // { path: "user/addPost/:id", component: AddPostComponent, canActivate:[AuthentificationGuard]},
  // { path: "user/:id/:id", component: AddPostComponent, canActivate:[AuthentificationGuard]},
  { path: '', redirectTo:'/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
