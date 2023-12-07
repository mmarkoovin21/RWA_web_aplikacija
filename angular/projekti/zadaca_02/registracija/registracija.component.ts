import { Component } from '@angular/core';
import { NavigacijaComponent } from "../navigacija/navigacija.component";
import { PodnozjeComponent } from "../podnozje/podnozje.component";

@Component({
    selector: 'app-registracija',
    standalone: true,
    templateUrl: './registracija.component.html',
    styleUrl: './registracija.component.scss',
    imports: [NavigacijaComponent, PodnozjeComponent]
})
export class RegistracijaComponent {

}
