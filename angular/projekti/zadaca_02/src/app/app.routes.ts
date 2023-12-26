import { Routes } from '@angular/router';
import { PocetnaComponent } from '../../pocetna/pocetna.component';
import { DnevnikComponent } from '../../dnevnik/dnevnik.component';
import { DokumentacijaComponent } from '../../dokumentacija/dokumentacija.component';
import { FavoritiComponent } from '../../favoriti/favoriti.component';
import { FavoritiDetaljiComponent } from '../../favoriti-detalji/favoriti-detalji.component';
import { KorisniciComponent } from '../../korisnici/korisnici.component';
import { PrijavaComponent } from '../../prijava/prijava.component';
import { ProfilComponent } from '../../profil/profil.component';
import { RegistracijaComponent } from '../../registracija/registracija.component';
import { SerijaDetaljiComponent } from '../../serija-detalji/serija-detalji.component';

export const routes: Routes = [
    { path: '', component: PocetnaComponent},
    { path: 'pocetna', component: PocetnaComponent},
    { path: 'dnevnik', component: DnevnikComponent},
    { path: 'dokumentacija', component: DokumentacijaComponent},
    { path: 'korisnici', component: KorisniciComponent},
    { path: 'favoriti', component: FavoritiComponent},
    { path: 'favoriti-detalji/:id', component: FavoritiDetaljiComponent},
    { path: 'prijava', component: PrijavaComponent},
    { path: 'profil', component: ProfilComponent},
    { path: 'registracija', component: RegistracijaComponent},
    { path: 'serija-detalji/:id', component: SerijaDetaljiComponent},
];
