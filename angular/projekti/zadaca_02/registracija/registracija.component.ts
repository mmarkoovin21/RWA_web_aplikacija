import { Component } from '@angular/core';
import { environment } from '../src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

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
        private router : Router
    ){
}

    async submit() {
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
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let odgovorRegistriraj = await fetch("/baza/korisnici", {
            method: "POST",
            headers: zaglavlje,
            body: JSON.stringify(tijelo)
        });
        if(odgovorRegistriraj.status == 201){
            this.router.navigate(["pocetna"]);
        }
    }
}
