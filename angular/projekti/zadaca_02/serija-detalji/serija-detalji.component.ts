import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SerijeService } from '../src/servisi/serije.service';
import { ISerijaTmdb } from '../src/interfaces/ISerijaTmdb';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-serija-detalji',
    standalone: true,
    templateUrl: './serija-detalji.component.html',
    styleUrl: './serija-detalji.component.scss',
    imports: []
})
export class SerijaDetaljiComponent{
    @Input() id  = 0;
    serija?: ISerijaTmdb;
    constructor (
        private serijeServis: SerijeService,
        private aktivnaRuta: ActivatedRoute,
        ){
        aktivnaRuta.paramMap.subscribe((parametri) => {
        let idSerije = parametri.get('id');
        if (idSerije != null) {
            serijeServis.dohvatiSeriju(parseInt(idSerije)).then((a) => {
                this.serija = a;
            });
          }
        });
        
    }
}
