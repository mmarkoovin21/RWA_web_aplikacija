import { Injectable } from '@angular/core';
import { ISerijaTmdb, ISerijeTmdb } from '../interfaces/ISerijaTmdb';
import { ISerije } from '../interfaces/ISerije';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SerijeService {
  private restServis = environment.restServis;
  private serijeTMDB? : ISerijeTmdb;
  private serijaTMDB? : ISerijeTmdb;
  private serije = new Array<ISerije>();
  
  constructor() {
    
  }
  async dohvatiSerije(stranica: number, kljucnaRijec: string): Promise<Array<ISerijaTmdb>>{
    let parametri = '?stranica=' + stranica + '&trazi=' + kljucnaRijec;
    let odgovor = (await fetch(
      this.restServis + 'tmdb/serije' + parametri
    )) as Response;
    if(odgovor.status == 200){
      let podaci = JSON.parse(await odgovor.text()) as ISerijeTmdb;
      this.serijeTMDB = podaci;
      console.log(podaci);

      let dohvaceneSerije: Array<ISerijaTmdb> = [];
    for(let s of this.serijeTMDB!.results){
      let serija: ISerijaTmdb = { 
        id: s.id,
        name: s.name,
        homepage: s.homepage,
        number_of_episodes: s.number_of_episodes,
        number_of_seasons: s.number_of_seasons,
        original_name: s.original_name,
        overview: s.overview,
        popularity: s.popularity,
        poster_path: s.poster_path,
        seasons: s.seasons
      };
      dohvaceneSerije.push(serija);
    }
    return dohvaceneSerije;
    }
    return [];
  }
}
