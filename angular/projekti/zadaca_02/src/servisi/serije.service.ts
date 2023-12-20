import { Injectable } from '@angular/core';
import { ISerijeTmdb } from '../interfaces/ISerijaTmdb';

@Injectable({
  providedIn: 'root'
})
export class SerijeService {
  restServis?: string;
  serijeTMDB?: ISerijeTmdb;

  constructor() { }
  async osvjeziSerije(stranica:number,kljucnaRijec:string){
    let parametri = "?stranica="+stranica+"&kljucnaRijec="+kljucnaRijec;
    let o = (await fetch(this.restServis + "/tmdb/serije" + parametri)) as Response;
      if(o.status == 200){
        let r = JSON.parse(await o.text()) as ISerijeTmdb;
        console.log(r);
        this.serijeTMDB = r;
      }
  }

  dajSerije():Array<ISerija>{
    if(this.filmovi.length == 0){
    if(this.filmoviTMDB == undefined){
    return new Array<FilmoviI>();
    } else if(this.filmoviTMDB.results.length==0){
    return new Array<FilmoviI>();
    } else {
    this.filmovi = new Array<FilmoviI>();
    for(let filmTMDB of this.filmoviTMDB.results){
    let film:FilmoviI = {naziv: filmTMDB.original_title
    ,opis:filmTMDB.overview};
    this.filmovi.push(film);
    }
    return this.filmovi;
    }
    } else {
    return this.filmovi;
    }
    }
}
