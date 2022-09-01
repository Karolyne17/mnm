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


const routes: Routes = [
  { path: '', component: InscriptionComponent, data: { title: 'Inscription' } },
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
  { path: "user/:id", component: ProfilComponent, canActivate:[AuthGuard], data: {title: 'Profil'}},
  { path: "user/updateAccount/:id", component: UpdateAccountComponent, canActivate:[AuthGuard], data: {title: 'Modifier Compte'}},
  { path: "addCar", component: AddCarComponent, canActivate:[AuthGuard], data: {title: 'Ajouter un véhicule'}},
  // { path: "user/addPost/:id", component: AddPostComponent, canActivate:[AuthentificationGuard], data: {title: 'Ajouter Trajet'}},
  // { path: "user/:id/:id", component: AddPostComponent, canActivate:[AuthentificationGuard], data: {title: 'About'}},
  { path: 'accueil', component: AccueilComponent, data: { title: 'Accueil' } },
  {
    path: 'travel/:id',
    component: TravelComponent,
    data: { title: 'Réservation' },
  },
  {
    path: 'admin/users',
    component: AdminComponent,
    data: { title: 'Admin : utilisateurs' },
  },
  {
    path: 'admin/cars',
    component: AdminCarComponent,
    data: { title: 'Admin : véhicules' },
  },
  {
    path: 'admin/travels',
    component: AdminTravelComponent,
    data: { title: 'Admin : trajets' },
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
