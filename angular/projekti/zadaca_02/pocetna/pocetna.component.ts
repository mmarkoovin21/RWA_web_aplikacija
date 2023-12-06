import { Component } from '@angular/core';
import { PodnozjeComponent } from "../podnozje/podnozje.component";
import { NavigacijaComponent } from "../navigacija/navigacija.component";

@Component({
    selector: 'app-pocetna',
    standalone: true,
    templateUrl: './pocetna.component.html',
    styleUrl: './pocetna.component.scss',
    imports: [PodnozjeComponent, NavigacijaComponent]
})
export class PocetnaComponent {

}
