import { Component } from '@angular/core';
import { NavigacijaComponent } from "../navigacija/navigacija.component";
import { PodnozjeComponent } from "../podnozje/podnozje.component";

@Component({
    selector: 'app-favoriti-detalji',
    standalone: true,
    templateUrl: './favoriti-detalji.component.html',
    styleUrl: './favoriti-detalji.component.scss',
    imports: [NavigacijaComponent, PodnozjeComponent]
})
export class FavoritiDetaljiComponent {

}
