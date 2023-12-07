import { Component } from '@angular/core';
import { NavigacijaComponent } from "../navigacija/navigacija.component";
import { PodnozjeComponent } from "../podnozje/podnozje.component";

@Component({
    selector: 'app-korisnici',
    standalone: true,
    templateUrl: './korisnici.component.html',
    styleUrl: './korisnici.component.scss',
    imports: [NavigacijaComponent, PodnozjeComponent]
})
export class KorisniciComponent {

}
