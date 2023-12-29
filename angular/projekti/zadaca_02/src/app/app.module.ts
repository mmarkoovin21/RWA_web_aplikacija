import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from '../../pocetna/pocetna.component';
import { DnevnikComponent } from '../../dnevnik/dnevnik.component';
import { DokumentacijaComponent } from '../../dokumentacija/dokumentacija.component';
import { KorisniciComponent } from '../../korisnici/korisnici.component';
import { FavoritiComponent } from '../../favoriti/favoriti.component';
import { FavoritiDetaljiComponent } from '../../favoriti-detalji/favoriti-detalji.component';
import { PrijavaComponent } from '../../prijava/prijava.component';
import { ProfilComponent } from '../../profil/profil.component';
import { RegistracijaComponent } from '../../registracija/registracija.component';
import { SerijaDetaljiComponent } from '../../serija-detalji/serija-detalji.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavigacijaComponent } from '../../komponente/navigacija/navigacija.component';
import { PodnozjeComponent } from '../../komponente/podnozje/podnozje.component';

export const routes: Routes = [
  { path: '', component: PocetnaComponent},
  { path: 'pocetna', component: PocetnaComponent},
  { path: 'dnevnik', component: DnevnikComponent},
  { path: 'dokumentacija', component:  DokumentacijaComponent},
  { path: 'korisnici', component: KorisniciComponent},
  { path: 'favoriti', component: FavoritiComponent},
  { path: 'favoriti-detalji/:id', component: FavoritiDetaljiComponent},
  { path: 'prijava', component: PrijavaComponent},
  { path: 'profil', component: ProfilComponent},
  { path: 'registracija', component: RegistracijaComponent},
  { path: 'serija-detalji/:id', component: SerijaDetaljiComponent},
];

@NgModule({
  declarations: [
    NavigacijaComponent,
    PodnozjeComponent,
    AppComponent,
    PocetnaComponent,
    DnevnikComponent,
    DokumentacijaComponent,
    KorisniciComponent,
    FavoritiComponent,
    FavoritiDetaljiComponent,
    PrijavaComponent,
    RegistracijaComponent,
    SerijaDetaljiComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
