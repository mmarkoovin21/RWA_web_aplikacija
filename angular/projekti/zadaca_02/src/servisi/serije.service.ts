import { Injectable } from '@angular/core';
import { ISerijaTmdb, ISerijeTmdb } from '../interfaces/ISerijaTmdb';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SerijeService {
  private restServis = environment.restServis;
  private serijeTMDB? : ISerijeTmdb;
  private serijaTMDB? : ISerijaTmdb;
  
  constructor() {
    
  }
  async dohvatiSerije(stranica: number, kljucnaRijec: string): Promise<Array<ISerijaTmdb>>{
    let parametri = '?stranica=' + stranica + '&trazi=' + kljucnaRijec;
    let odgovor = (await fetch(
      this.restServis + '/api/tmdb/serije' + parametri
    )) as Response;
    
    if(odgovor.status == 200){
      let podaci = JSON.parse(await odgovor.text()) as ISerijeTmdb;
      this.serijeTMDB = podaci;

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
        tmdbId: s.tmdbId,
        seasons: s.seasons
      };
      dohvaceneSerije.push(serija);
    }
    
    return dohvaceneSerije;
    }
    return [];
  }
  
  async dohvatiSeriju(id: number): Promise<ISerijaTmdb>{
      let dohvacena =  (await ((await fetch(this.restServis + "/api/tmdb/serije/" + id)) as Response).json()) as ISerijaTmdb;

      let serija: ISerijaTmdb = {
        id: dohvacena.id,
        name: dohvacena.name,
        homepage: dohvacena.homepage,
        number_of_episodes: dohvacena.number_of_episodes,
        number_of_seasons: dohvacena.number_of_seasons,
        original_name: dohvacena.original_name,
        overview: dohvacena.overview,
        popularity: dohvacena.popularity,
        tmdbId: dohvacena.tmdbId,
        poster_path: environment.posteriPutanja + dohvacena.poster_path,
        seasons: dohvacena.seasons
      }
      return serija;
  }
}
