import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SerijeService } from '../src/servisi/serije.service';
import { environment } from '../src/environments/environment';
import { ISerijaTmdb } from '../src/interfaces/ISerijaTmdb';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-pocetna',
    templateUrl: './pocetna.component.html',
    styleUrl: './pocetna.component.scss',
})
export class PocetnaComponent {
    @Output() idSerije = new EventEmitter<number>();
    serije = new Array<ISerijaTmdb>();
    filter: string  = ' ';
    constructor(
        private serijeServis: SerijeService,
        private router : Router
    ){}

    async filtriraj(dogadaj: Event): Promise<void>{
        this.filter = (dogadaj.target as HTMLInputElement).value;
        if(this.filter.length >= 3){
            this.serijeServis.dohvatiSerije(1,this.filter).then((serije)=>{
                this.serije = serije;
            });
        }
    }
    posaljiId(id: number){
        this.router.navigate(["serija-detalji", id]);
    }
}
