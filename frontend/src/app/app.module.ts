import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilComponent } from './Pages/profil/profil.component';
import { InscriptionComponent } from './Pages/inscription/inscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConnectionComponent } from './Pages/connection/connection.component';
import { AccueilComponent } from './Pages/accueil/accueil.component';
import { UpdateAccountComponent } from './Pages/update-account/update-account.component';
import { HeaderComponent } from './Pages/header/header.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LocalizedDatePipe } from './pipe/localized-date.pipe';
import { TravelComponent } from './Pages/travel/travel.component';
<<<<<<< Updated upstream
import { AdminComponent } from './Pages/admin/admin.component';
import { AdminCarComponent } from './Pages/admin-car/admin-car.component';
import { AdminTravelComponent } from './Pages/admin-travel/admin-travel.component';
import { AdminMenuComponent } from './Pages/admin-menu/admin-menu.component';
import { AddCarComponent } from './Pages/add-car/add-car.component';
import { UserService } from './service/user.service';
import { AdminLoginComponent } from './Pages/admin-login/admin-login.component';

=======
import { AddTravelComponent } from './Pages/add-travel/add-travel.component';
>>>>>>> Stashed changes

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
    InscriptionComponent,
    ConnectionComponent,
    AccueilComponent,

    UpdateAccountComponent,
    HeaderComponent,
    LocalizedDatePipe,
    TravelComponent,
<<<<<<< Updated upstream
    AdminComponent,
    AdminCarComponent,
    AdminTravelComponent,
    AdminMenuComponent,
    AddCarComponent,
    AdminLoginComponent
=======
    AddTravelComponent,
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
