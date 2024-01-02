import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from '../src/servisi/korisnici.service';
import { AppComponent } from '../src/app/app.component';

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
    async jeAdmin(){
        this.korisniciServis.jeAdmin().then((a)=>{
            if(a){
                console.log("admin servis "+ a);
                
                AppComponent.admin = true;
            }
            
        });
    }

}
