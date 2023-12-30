import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppComponent } from '../../src/app/app.component';
import { KorisniciService } from '../../src/servisi/korisnici.service';
import { async } from 'rxjs';

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
    jeAdmin(){
      return AppComponent.admin;
    }
    jePrijavljen(){
      return AppComponent.prijavljen;
    }
    vratiNaPrijavu(){
      if(!this.jePrijavljen()){
        this.router.navigate(["prijava"]);
      } else return;
    }
    async odjavi() {
      this.korisnikService.odjaviKorisnika().then((o)=> {
        if(o != false){
          AppComponent.prijavljen = false;
          AppComponent.admin = false;
        }
      });
    }
}
