import { Component } from '@angular/core';
import { PodnozjeComponent } from "../podnozje/podnozje.component";

@Component({
    selector: 'app-favoriti',
    standalone: true,
    templateUrl: './favoriti.component.html',
    styleUrl: './favoriti.component.scss',
    imports: [PodnozjeComponent]
})
export class FavoritiComponent {

}
