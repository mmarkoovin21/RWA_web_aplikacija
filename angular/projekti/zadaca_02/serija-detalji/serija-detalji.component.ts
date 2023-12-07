import { Component } from '@angular/core';
import { NavigacijaComponent } from "../navigacija/navigacija.component";
import { PodnozjeComponent } from "../podnozje/podnozje.component";

@Component({
    selector: 'app-serija-detalji',
    standalone: true,
    templateUrl: './serija-detalji.component.html',
    styleUrl: './serija-detalji.component.scss',
    imports: [NavigacijaComponent, PodnozjeComponent]
})
export class SerijaDetaljiComponent {

}
