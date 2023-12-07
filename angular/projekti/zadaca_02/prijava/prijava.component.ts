import { Component } from '@angular/core';
import { NavigacijaComponent } from "../navigacija/navigacija.component";
import { PodnozjeComponent } from "../podnozje/podnozje.component";

@Component({
    selector: 'app-prijava',
    standalone: true,
    templateUrl: './prijava.component.html',
    styleUrl: './prijava.component.scss',
    imports: [NavigacijaComponent, PodnozjeComponent]
})
export class PrijavaComponent {

}
