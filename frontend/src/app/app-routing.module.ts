import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './Pages/accueil/accueil.component';
import { AuthGuard } from './Guard/auth.guard';
import { ConnectionComponent } from './Pages/connection/connection.component';
import { InscriptionComponent } from './Pages/inscription/inscription.component';
import { ProfilComponent } from './Pages/profil/profil.component';
import { UpdateAccountComponent } from './Pages/update-account/update-account.component';
import { HeaderComponent } from './Pages/header/header.component';
import { TravelComponent } from './Pages/travel/travel.component';
import { AdminComponent } from './Pages/admin/admin.component';
import { AdminCarComponent } from './Pages/admin-car/admin-car.component';
import { AdminTravelComponent } from './Pages/admin-travel/admin-travel.component';
import { AddCarComponent } from './Pages/add-car/add-car.component';
import { AdminLoginComponent } from './Pages/admin-login/admin-login.component';
import { AddTravelComponent } from './Pages/add-travel/add-travel.component';
import { MessageComponent } from './Pages/message/message.component';
import { AddMessageComponent } from './Pages/add-message/add-message.component';
import { ReadMessageComponent } from './Pages/read-message/read-message.component';

const routes: Routes = [
  {
    path: 'inscription',
    component: InscriptionComponent,
    data: { title: 'Inscription' },
  },
  {
    path: 'connection',
    component: ConnectionComponent,
    data: { title: 'Connection' },
  },
  //{ path: "profile", component: ProfilComponent, data: {title: 'Profil'} },
  {
    path: 'user/:id',
    component: ProfilComponent,
    canActivate: [AuthGuard],
    data: { title: 'Profil' },
  },
  {
    path: 'updateAccount/:id',
    component: UpdateAccountComponent,
    canActivate: [AuthGuard],
    data: { title: 'Modifier Compte' },
  },
  {
    path: 'addCar',
    component: AddCarComponent,
    canActivate: [AuthGuard],
    data: { title: 'Ajouter un véhicule' },
  },
  // { path: "user/addPost/:id", component: AddPostComponent, canActivate:[AuthentificationGuard], data: {title: 'Ajouter Trajet'}},
  // { path: "user/:id/:id", component: AddPostComponent, canActivate:[AuthentificationGuard], data: {title: 'About'}},
  { path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard], data: { title: 'Accueil' } },
  {
    path: 'travel/:id',
    component: TravelComponent,
    canActivate: [AuthGuard],
    data: { title: 'Réservation' },
  },
  {
    path: 'admin/users',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { title: 'Admin : utilisateurs' },
  },
  {
    path: 'admin/cars',
    component: AdminCarComponent,
    canActivate: [AuthGuard],
    data: { title: 'Admin : véhicules' },
  },
  {
    path: 'admin/travels',
    component: AdminTravelComponent,
    canActivate: [AuthGuard],
    data: { title: 'Admin : trajets' },
  },
  {
    path: 'admin',
    component: AdminLoginComponent,
    canActivate: [AuthGuard],
    data: { title: 'Admin : connexion' },
  },
  { path: '', redirectTo: '/inscription', pathMatch: 'full' },
  { path: "travel/:id", canActivate: [AuthGuard], component: TravelComponent, data: {title: 'Réservation'}},
  { path: "addTravel", canActivate: [AuthGuard], component: AddTravelComponent, data: {title: 'Ajout Trajet'}},
  { path: "message/:id", canActivate: [AuthGuard], component: MessageComponent, data: {title: 'Mes messages'}},
  { path: "message/:id/:user", canActivate: [AuthGuard], component: AddMessageComponent, data: {title: 'Ajout message'}},
  { path: "msg/:idmsg", canActivate: [AuthGuard], component: ReadMessageComponent, data: {title: 'Message'}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
