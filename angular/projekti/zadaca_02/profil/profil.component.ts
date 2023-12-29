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
    promjeni: boolean = false;
    ime: string = '';
    prezime: string = '';
    adresa: string = '';
    musko: string = '';
    zensko: string = '';
    spol: string = '';
    zvanje: string = '';
    lozinka: string = '';
    korime: string = '';

    constructor(
        private korisnikServis: KorisniciService
    ){}
    ngOnInit(): void {
        this.korisnikServis.dohvatiKorisnika().then((k)=>{
            this.korisnik = k;

            this.ime = this.korisnik.ime;
            this.prezime = this.korisnik.prezime;
            this.adresa = this.korisnik.adresa;
            this.zvanje = this.korisnik.zvanje;
            this.korime = this.korisnik.korIme;
            this.spol = this.korisnik.spol;
            if(this.spol == "Muško"){
                this.musko = "Muško";
            }else if(this.spol == "Žensko"){
                this.zensko = "Žensko";
            }
            
        });
    }
        postavi() {
            this.promjeni = true;
        }
        makni(){
            this.promjeni = false;
        }
        azurirajPodatke() {
        this.makni();
        }
}
