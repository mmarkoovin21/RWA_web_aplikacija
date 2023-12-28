import { Component } from '@angular/core';
import { environment } from '../src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisniciService } from '../src/servisi/korisnici.service';

@Component({
    selector: 'app-registracija',
    templateUrl: './registracija.component.html',
    styleUrl: './registracija.component.scss',
})
export class RegistracijaComponent {
    private restServis = environment.restServis;
    ime: string = '';
    prezime: string = '';
    adresa: string = '';
    musko: string = '';
    zensko: string = '';
    spol: string = '';
    zvanje: string = '';
    lozinka: string = '';
    email: string = '';
    korime: string = '';
    constructor(
        private router : Router,
        private korisniciServis: KorisniciService
    ){
}

    async registriraj() {
        if(this.musko != ''){
            this.spol = this.musko;
        }else if(this.zensko != ''){
            this.spol = this.zensko;
        }
        let tijelo = {
            ime: this.ime,
            prezime: this.prezime,
            adresa: this.adresa,
            spol: this.spol,
            zvanje: this.zvanje,
            lozinka: this.lozinka,
            email: this.email,
            korime: this.korime
        }
        let t = JSON.stringify(tijelo);
        let registracija =  await this.korisniciServis.registrirajKorisnika(t);
        if(registracija){
            this.router.navigate(["pocetna"]);
        }else{
            console.log("Došlo je do pogreške! Korisnik nije registriran!");
        }
    }
}
