import { Component } from '@angular/core';
import { IFavorit, ISezona } from '../src/interfaces/IFavoriti';
import { ActivatedRoute, Router } from '@angular/router';
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
    id?: number;
    putanja = environment.posteriPutanja;
    constructor (
        private favoritiServis: FavoritiService,
        private aktivnaRuta: ActivatedRoute,
        private router: Router
        ){
        aktivnaRuta.paramMap.subscribe((parametri) => {
        let idFavorita = parametri.get('id') as unknown as number;
        this.id = idFavorita
        if (idFavorita != null) {
            favoritiServis.dohvatiFavorita(idFavorita).then((favorit) => {
                this.favorit = favorit;
            });
            favoritiServis.dohvatiSezoneFavorita(idFavorita).then((s) => {
                this.sezone = s;
            });
          }
        });
        
    }
    async izbrisiFavorita() {
        await this.favoritiServis.izbrisiFavorit(this.id!);
        this.router.navigate(["favoriti"]);
    }
}
