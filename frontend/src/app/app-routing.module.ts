import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './Pages/accueil/accueil.component';
import { AuthGuard } from './Guard/auth.guard';
import { ConnectionComponent } from './Pages/connection/connection.component';
import { InscriptionComponent } from './Pages/inscription/inscription.component';
import { ProfilComponent } from './Pages/profil/profil.component';
import { UpdateAccountComponent } from './Pages/update-account/update-account.component';
import { HeaderComponent } from './Pages/header/header.component';

const routes: Routes = [
  { path: "", component: InscriptionComponent, data: {title: 'Inscription'} },
  { path: "inscription", component: InscriptionComponent, data: {title: 'Inscription'} },
  { path: "connection", component: ConnectionComponent, data: {title: 'Connection'} },
  //{ path: "profile", component: ProfilComponent, data: {title: 'Profil'} },
  { path: "user/:id", component: ProfilComponent, canActivate:[AuthGuard], data: {title: 'Profil'}},
  { path: "user/updateAccount/:id", component: UpdateAccountComponent, canActivate:[AuthGuard], data: {title: 'Modifier Compte'}},
  // { path: "user/addPost/:id", component: AddPostComponent, canActivate:[AuthentificationGuard], data: {title: 'Ajouter Trajet'}},
  // { path: "user/:id/:id", component: AddPostComponent, canActivate:[AuthentificationGuard], data: {title: 'About'}},
  { path: "accueil", component: AccueilComponent, data: {title: 'Accueil'} },
  { path: '', redirectTo:'/', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
