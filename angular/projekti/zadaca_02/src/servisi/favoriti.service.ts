import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IFavorit } from '../interfaces/IFavoriti';
import { KorisniciService } from './korisnici.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritiService {
  private restServis = environment.restServis;
  private favoriti?: Array<IFavorit>;

  constructor(
    private korisniciService: KorisniciService
  ) { }

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
  async dodajFavorita(tijelo: string): Promise<boolean>{
    let token = await this.korisniciService.dajJWT();

    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    zaglavlje.set("Authorization", token);

    let odgovorDodaj = await fetch("/baza/favoriti", {
      method: "POST",
      headers: zaglavlje,
      body: tijelo
    });
    if(odgovorDodaj.status == 201){
      return true;
    }else return false;
  }
}
