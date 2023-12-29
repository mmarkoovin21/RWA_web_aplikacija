import { Component, OnInit } from '@angular/core';
import { KorisniciService } from '../src/servisi/korisnici.service';
import { IKoriskik } from '../src/interfaces/IKorisnici';

@Component({
    selector: 'app-profil',
    templateUrl: './profil.component.html',
    styleUrl: './profil.component.scss',
})
export class ProfilComponent implements OnInit{
    korisnik?: IKoriskik;
    ime = this.korisnik?.ime;
    prezime = this.korisnik?.prezime;
    adresa = this.korisnik?.adresa;
    musko = '';
    zensko = '';
    spol = this.korisnik?.spol;
    zvanje = this.korisnik?.prezime;
    lozinka = '';
    email = this.korisnik?.email;
    korime = this.korisnik?.korIme;

    constructor(
        private korisnikServis: KorisniciService
    ){}
    ngOnInit(): void {
        this.korisnikServis.dohvatiKorisnika().then((k)=>{
            this.korisnik = k;
        });
    }

}
