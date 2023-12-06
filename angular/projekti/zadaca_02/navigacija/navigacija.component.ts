import { Component } from '@angular/core';
import { DokumentacijaComponent } from '../dokumentacija/dokumentacija.component';

@Component({
  selector: 'app-navigacija',
  standalone: true,
  imports: [DokumentacijaComponent],
  templateUrl: './navigacija.component.html',
  styleUrl: './navigacija.component.scss'
})
export class NavigacijaComponent {

}
