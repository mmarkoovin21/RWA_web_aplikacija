import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from '../src/servisi/korisnici.service';

@Component({
    selector: 'app-prijava',
    templateUrl: './prijava.component.html',
    styleUrl: './prijava.component.scss',
})
export class PrijavaComponent {
    korime: string = '';
    lozinka: string = '';

    constructor(
        private router : Router,
        private korisniciServis: KorisniciService
    ){}

    async prijavi() {
        let prijava = await this.korisniciServis.prijaviKorisnika(this.lozinka,this.korime);
        if(prijava){
            this.router.navigate(["pocetna"]);
        }else{
            console.log("Došlo je do pogreške! Korisnik nije prijavljen!");
        }
    }

}
