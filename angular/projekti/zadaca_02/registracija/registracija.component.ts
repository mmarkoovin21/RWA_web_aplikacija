import { Component } from '@angular/core';
import { environment } from '../src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisniciService } from '../src/servisi/korisnici.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
    selector: 'app-registracija',
    templateUrl: './registracija.component.html',
    styleUrl: './registracija.component.scss',
})
export class RegistracijaComponent {
    private restServis = environment.restServis;
    obaveznoEmail: boolean = false;
    obaveznoLozinka: boolean = false;
    obaveznoKorime: boolean = false;
    poruka: string = '';
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
        private korisniciServis: KorisniciService,
        private reChaptcha: ReCaptchaV3Service
    ){}
    provjeriLozinku(){
        const lozinkaRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!lozinkaRegex.test(this.lozinka)) {
            this.poruka += "Lozinka u sebi mora sadržavati jedan poseban znak, broj i minimalno 8 znakova!\n";
            this.obaveznoLozinka = true;
        }
    }
    provjeriEmail(){
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(this.email)) {
            this.poruka += "Email adresa nije ispravna! Ispravan format: xxx@xxx.xxx\n";
            this.obaveznoEmail = true;
        }
    }
    async provjeriKorime(){
        let postoji = await this.korisniciServis.postojiKorime(this.korime);
        
        if (this.korime.length < 6) {
            this.poruka += "Korisničko ime mora imati barem 6 znakova!\n";
            this.obaveznoKorime = true;
        }else if(postoji){
            this.poruka += "Korisničko ime već postoji!\n";
            this.obaveznoKorime = true;
        }
    }

    async registriraj() {
        this.poruka = '';
        this.obaveznoEmail = false;
        this.obaveznoKorime = false;
        this.obaveznoLozinka = false;
        this.reChaptcha.execute('registracija').subscribe(async (token: string) => {
            let zaglavlje = new Headers();
            zaglavlje.set("Content-Type", "application/json");

            let odgovor = await fetch("/recaptcha", {
                method: "POST",
                headers: zaglavlje,
                body: JSON.stringify({token: token})
            });

            if (odgovor.status == 201) {
                if(this.lozinka != '' || this.email != '' || this.korime != ''){
                    this.provjeriLozinku();
                    this.provjeriEmail();
                    await this.provjeriKorime();
                    if (this.obaveznoLozinka || this.obaveznoEmail || this.obaveznoKorime) {
                        return;
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
                }else{
                    this.poruka = "Niste unijeli obavezne korisničke podatke!"
                    this.obaveznoLozinka = true;
                    this.obaveznoEmail = true;
                    this.obaveznoKorime = true;
                }
                
            }
        });
    }
}
