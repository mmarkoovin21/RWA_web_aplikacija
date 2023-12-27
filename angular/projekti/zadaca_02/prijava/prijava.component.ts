import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-prijava',
    templateUrl: './prijava.component.html',
    styleUrl: './prijava.component.scss',
})
export class PrijavaComponent {
    korime: string = '';
    lozinka: string = '';

    constructor(
        private router : Router
    ){}

    async submit() {
        let tijelo = {
            lozinka: this.lozinka
        }
        
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let odgovorPrijavi = await fetch("/baza/korisnici/" + this.korime + "/prijava", {
            method: "POST",
            headers: zaglavlje,
            body: JSON.stringify(tijelo)
        });
        
        if(odgovorPrijavi.status == 201){
            this.router.navigate(["pocetna"]);
        }
    }

}
