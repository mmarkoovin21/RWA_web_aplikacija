import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IFavorit, ISezona } from '../interfaces/IFavoriti';
import { KorisniciService } from './korisnici.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritiService {
  private restServis = environment.restServis;
  private favoriti?: Array<IFavorit>;
  private sezone?: Array<ISezona>;

  constructor(
    private korisniciService: KorisniciService
  ) { }

  async dohvatiFavorite(): Promise<Array<IFavorit>>{
    let odgovor = (await fetch(
      this.restServis + '/baza/favoriti'
    )) as Response;
    
    
    if(odgovor.status == 200){
      let podaci = JSON.parse(await odgovor.text()) as Array<IFavorit>;
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

  async dohvatiSezoneFavorita(id: number): Promise<Array<ISezona>>{
    let odgovor = (await fetch(this.restServis + "/baza/sezone/" + id)) as Response;
    if(odgovor.status == 200){
      let podaci = JSON.parse(await odgovor.text()) as Array<ISezona>;
      this.sezone = podaci;

      let dohvaceneSezone: Array<ISezona> = [];
      for(let s of this.sezone!){
        let sezona: ISezona ={
          naziv: s.naziv,
          opis: s.opis,
          putanjaPostera: s.putanjaPostera,
          brojSezone: s.brojSezone,
          brojEpizoda: s.brojEpizoda
        }
        dohvaceneSezone.push(sezona);
      }
      return dohvaceneSezone;
    }
    return [];
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
  async izbrisiFavorit(id: number): Promise<boolean>{
    let token = await this.korisniciService.dajJWT();

    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    zaglavlje.set("Authorization", token);

    let odgovorDelete = await fetch("/baza/favoriti/" + id, {
      method: "DELETE",
      headers: zaglavlje
    });
    if(odgovorDelete.status == 201){
      return true;
    }else return false;
  }
}
