import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IFavorit } from '../interfaces/IFavoriti';

@Injectable({
  providedIn: 'root'
})
export class FavoritiService {
  private restServis = environment.restServis;
  private favoriti?: Array<IFavorit>;

  constructor() { }

  async dohvatiFavorite(): Promise<Array<IFavorit>>{
    let odgovor = (await fetch(
      this.restServis + '/baza/favoriti'
    )) as Response;
    
    
    if(odgovor.status == 200){
      let podaci = JSON.parse(await odgovor.text()) as Array<IFavorit>;
      console.log(podaci);
      
      this.favoriti = podaci;

    let dohvaceniFavoriti: Array<IFavorit> = [];
      
    for(let f of this.favoriti!){
      let favorit: IFavorit = { 
        idSerije: f.idSerije,
        naziv: f.naziv,
        vanjskaStranica: f.vanjskaStranica,
        brojEpizoda: f.brojEpizoda,
        brojSezona: f.brojSezona,
        opis: f.opis,
        popularnost: f.popularnost,
        putanjaSlike: f.putanjaSlike,
        tmdbId: f.tmdbId
      };
      dohvaceniFavoriti.push(favorit);
    }
    
    return dohvaceniFavoriti;
    }
    return [];
  }
  async dohvatiFavorita(id: number): Promise<IFavorit>{
    let dohvacen =  (await ((await fetch(this.restServis + "/baza/favoriti/" + id)) as Response).json()) as IFavorit;
    let favorit: IFavorit = {
      idSerije: dohvacen.idSerije,
      naziv: dohvacen.naziv,
      opis: dohvacen.opis,
      brojEpizoda: dohvacen.brojEpizoda,
      brojSezona: dohvacen.brojSezona,
      putanjaSlike: dohvacen.putanjaSlike,
      vanjskaStranica: dohvacen.vanjskaStranica,
      popularnost: dohvacen.popularnost,
      tmdbId: dohvacen.tmdbId
    }

    return favorit;
  }
}
