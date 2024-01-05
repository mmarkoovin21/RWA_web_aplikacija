import { Component } from '@angular/core';
import { IFavorit, ISezona } from '../src/interfaces/IFavoriti';
import { ActivatedRoute } from '@angular/router';
import { FavoritiService } from '../src/servisi/favoriti.service';
import { environment } from '../src/environments/environment';

@Component({
    selector: 'app-favoriti-detalji',
    templateUrl: './favoriti-detalji.component.html',
    styleUrl: './favoriti-detalji.component.scss',
})
export class FavoritiDetaljiComponent {
    favorit?: IFavorit;
    sezone?: Array<ISezona>;
    putanja = environment.posteriPutanja;
    constructor (
        private favoritiServis: FavoritiService,
        private aktivnaRuta: ActivatedRoute,
        ){
        aktivnaRuta.paramMap.subscribe((parametri) => {
        let idFavorita = parametri.get('id');
        if (idFavorita != null) {
            favoritiServis.dohvatiFavorita(parseInt(idFavorita)).then((favorit) => {
                this.favorit = favorit;
            });
            favoritiServis.dohvatiSezoneFavorita(parseInt(idFavorita)).then((s) => {
                this.sezone = s;
            });
          }
        });
        
    }
}
