import { Component } from '@angular/core';
import { PodnozjeComponent } from "../podnozje/podnozje.component";

@Component({
    selector: 'app-dnevnik',
    standalone: true,
    templateUrl: './dnevnik.component.html',
    styleUrl: './dnevnik.component.scss',
    imports: [PodnozjeComponent]
})
export class DnevnikComponent {

}
