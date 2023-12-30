import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppComponent } from '../../src/app/app.component';
import { KorisniciService } from '../../src/servisi/korisnici.service';

@Component({
  selector: 'app-navigacija',
  templateUrl: './navigacija.component.html',
  styleUrl: './navigacija.component.scss'
})
export class NavigacijaComponent {
    constructor(
      private korisnikService: KorisniciService,
      private router : Router
    ){}

    odjavi() {
      this.korisnikService.odjaviKorisnika().then((o)=> {
        console.log(o);
      });
    }
}
