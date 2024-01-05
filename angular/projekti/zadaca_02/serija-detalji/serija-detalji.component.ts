import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SerijeService } from '../src/servisi/serije.service';
import { ISerijaTmdb } from '../src/interfaces/ISerijaTmdb';
import { ActivatedRoute } from '@angular/router';
import { FavoritiService } from '../src/servisi/favoriti.service';
import { IFavorit } from '../src/interfaces/IFavoriti';

@Component({
    selector: 'app-serija-detalji',
    templateUrl: './serija-detalji.component.html',
    styleUrl: './serija-detalji.component.scss',
})
export class SerijaDetaljiComponent{
    serija?: ISerijaTmdb;
    constructor (
        private serijeServis: SerijeService,
        private favoritiServis: FavoritiService,
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
    async dodajFavorita() {
        let tijelo = {
            naziv: this.serija?.name,
            opis: this.serija?.overview,
            brojSezona: this.serija?.number_of_seasons,
            brojEpizoda: this.serija?.number_of_episodes,
            popularnost: this.serija?.popularity,
            putanjaSlike: this.serija?.poster_path,
            vanjskaStranica: this.serija?.homepage,
            tmdbId: this.serija?.id
        }
        
        let t = JSON.stringify(tijelo);
        let dodan =  await this.favoritiServis.dodajFavorita(t);

        if(dodan){
            console.log("Favorit je dodan u bazu!");
        }else{
            console.log("Došlo je do pogreške! Korisnik nije registriran!");
        }
        
    }
}
