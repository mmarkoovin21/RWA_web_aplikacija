import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from '../src/servisi/korisnici.service';
import { AppComponent } from '../src/app/app.component';
import { ReCaptchaV3Service } from 'ng-recaptcha';

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
        private korisniciServis: KorisniciService,
        private reChaptcha: ReCaptchaV3Service
    ){}

    async prijava() {
        this.reChaptcha.execute('prijava').subscribe(async (token: string) => {
            let zaglavlje = new Headers();
            zaglavlje.set("Content-Type", "application/json");

            let odgovor = await fetch("/recaptcha", {
                method: "POST",
                headers: zaglavlje,
                body: JSON.stringify({token: token})
            });

            if (odgovor.status == 201) {
                let tijelo = {
                    lozinka: this.lozinka
                }
                let t = JSON.stringify(tijelo);
                let prijava = await this.korisniciServis.prijaviKorisnika(t,this.korime);
                if(prijava){
                    AppComponent.prijavljen = true;
                    this.jeAdmin();
                    this.router.navigate(["pocetna"]);
                }else{
                    console.log("Došlo je do pogreške! Korisnik nije prijavljen!");
                }
            }
        });
    }

    async jeAdmin(){
        this.korisniciServis.jeAdmin().then((a)=>{
            if(a){
                AppComponent.admin = true;
            }
            
        });
    }
}
