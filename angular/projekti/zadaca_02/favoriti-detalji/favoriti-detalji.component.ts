import { Component } from '@angular/core';
import { IFavorit } from '../src/interfaces/IFavoriti';
import { ActivatedRoute } from '@angular/router';
import { FavoritiService } from '../src/servisi/favoriti.service';

@Component({
    selector: 'app-favoriti-detalji',
    templateUrl: './favoriti-detalji.component.html',
    styleUrl: './favoriti-detalji.component.scss',
})
export class FavoritiDetaljiComponent {
    favorit?: IFavorit;
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
          }
        });
        
    }
}
