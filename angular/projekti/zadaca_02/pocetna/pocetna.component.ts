import { Component, Input, NgModule} from '@angular/core';
import { SerijeService } from '../src/servisi/serije.service';
import { ISerijaTmdb } from '../src/interfaces/ISerijaTmdb';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pocetna',
    templateUrl: './pocetna.component.html',
    styleUrl: './pocetna.component.scss',
})
export class PocetnaComponent {
    serije = new Array<ISerijaTmdb>();
    filter: string  = '';
    constructor(
        private serijeServis: SerijeService,
        private router : Router
    ){}

    async filtriraj(): Promise<void>{
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
