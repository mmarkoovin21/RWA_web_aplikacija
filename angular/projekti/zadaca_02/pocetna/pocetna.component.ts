import { Component } from '@angular/core';
import { ISerije } from '../src/interfaces/ISerije';
import { SerijeService } from '../src/servisi/serije.service';
import { environment } from '../src/environments/environment';
import { ISerijaTmdb } from '../src/interfaces/ISerijaTmdb';

@Component({
    selector: 'app-pocetna',
    standalone: true,
    templateUrl: './pocetna.component.html',
    styleUrl: './pocetna.component.scss',
    imports: []
})
export class PocetnaComponent {
    serije = new Array<ISerijaTmdb>();
    filter: string  = ' ';
    constructor(private serijeServis: SerijeService){}

    async filtriraj(dogadaj: Event): Promise<void>{
        this.filter = (dogadaj.target as HTMLInputElement).value;
        if(this.filter.length >= 3){
            this.serijeServis.dohvatiSerije(1,this.filter).then((serije)=>{
                this.serije = serije;
            });
        }
    }
}
