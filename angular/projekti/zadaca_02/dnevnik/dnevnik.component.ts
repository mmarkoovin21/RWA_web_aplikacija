import { Component } from '@angular/core';
import { PodnozjeComponent } from "../podnozje/podnozje.component";
import { NavigacijaComponent } from "../navigacija/navigacija.component";

@Component({
    selector: 'app-dnevnik',
    standalone: true,
    templateUrl: './dnevnik.component.html',
    styleUrl: './dnevnik.component.scss',
    imports: [PodnozjeComponent, NavigacijaComponent]
})
export class DnevnikComponent {

}
