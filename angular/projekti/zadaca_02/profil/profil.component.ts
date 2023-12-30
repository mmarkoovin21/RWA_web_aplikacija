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
    tijelo?: any;
    promjeni: boolean = false;
    ime: string = '';
    prezime: string = '';
    adresa: string = '';
    spol: string = '';
    zvanje: string = '';
    lozinka: string = '';
    korime: string = '';

    constructor(
        private korisnikServis: KorisniciService
    ){}
    ngOnInit(): void {
        this.osvjeziVrijednosti();
    }
    osvjeziVrijednosti(){
        this.korisnikServis.dohvatiKorisnika().then((k)=>{
            this.korisnik = k;

            this.ime = this.korisnik.ime;
            this.prezime = this.korisnik.prezime;
            this.adresa = this.korisnik.adresa;
            this.zvanje = this.korisnik.zvanje;
            this.korime = this.korisnik.korIme;
            this.spol = this.korisnik.spol;
            
        });
    }
    postavi() {
        this.promjeni = true;
    }
    makni(){
        this.promjeni = false;
    }
    odustani() {
        this.osvjeziVrijednosti();
        this.promjeni = false;
    }
    async azurirajPodatke() {
        if(this.lozinka == ''){
            this.tijelo = {
                ime: this.ime,
                prezime: this.prezime,
                adresa: this.adresa,
                spol: this.spol,
                zvanje: this.zvanje
            }
            
        }else{
            this.tijelo = {
                ime: this.ime,
                prezime: this.prezime,
                adresa: this.adresa,
                spol: this.spol,
                zvanje: this.zvanje,
                lozinka: this.lozinka
            }
        }
        console.log(this.tijelo);
        
        let t = JSON.stringify(this.tijelo);
        
        let azuriran = await this.korisnikServis.azurirajKorisnika(t);
        if(azuriran){
            this.osvjeziVrijednosti();
            this.makni();
            this.lozinka = '';
        }else{
            console.log("Došlo je do pogreške! Podaci nisu ažurirani!");
            
        }
    }
}
