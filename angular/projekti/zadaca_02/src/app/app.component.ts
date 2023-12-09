import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigacijaComponent } from "../../komponente/navigacija/navigacija.component";
import { PodnozjeComponent } from "../../komponente/podnozje/podnozje.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, NavigacijaComponent, PodnozjeComponent]
})
export class AppComponent {
  title = 'zadaca_02';
}
