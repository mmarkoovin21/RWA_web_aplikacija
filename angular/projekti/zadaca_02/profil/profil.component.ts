import { Component, OnInit } from '@angular/core';
import { KorisniciService } from '../src/servisi/korisnici.service';
import { IKoriskik } from '../src/interfaces/IKorisnici';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
    selector: 'app-profil',
    templateUrl: './profil.component.html',
    styleUrl: './profil.component.scss',
})
export class ProfilComponent implements OnInit{
    korisnik?: IKoriskik;
    poruka: string = '';
    provjeraLozinka: boolean = false;
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
        private korisnikServis: KorisniciService,
        private reChaptcha: ReCaptchaV3Service
    ){}
    ngOnInit(): void {
        this.osvjeziVrijednosti();
    }
    provjeriLozinku(){
        const lozinkaRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!lozinkaRegex.test(this.lozinka)) {
            this.poruka += "Lozinka u sebi mora sadržavati jedan poseban znak, broj i minimalno 8 znakova!\n";
            this.provjeraLozinka = true;
        }
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
        this.provjeraLozinka = false;
        this.reChaptcha.execute('profil').subscribe(async (token: string) => {
            let zaglavlje = new Headers();
            zaglavlje.set("Content-Type", "application/json");

            let odgovor = await fetch("/recaptcha", {
                method: "POST",
                headers: zaglavlje,
                body: JSON.stringify({token: token})
            });

            if (odgovor.status == 201) {
                if(this.lozinka == ''){
                    this.tijelo = {
                        ime: this.ime,
                        prezime: this.prezime,
                        adresa: this.adresa,
                        spol: this.spol,
                        zvanje: this.zvanje
                    }
                    
                }else{
                    this.provjeriLozinku();
                    if(this.provjeraLozinka) return;
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
        });
    }
}
