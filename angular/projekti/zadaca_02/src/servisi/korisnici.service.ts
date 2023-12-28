import { Injectable } from '@angular/core';
import { IKoriskik } from '../interfaces/IKorisnici';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {
  private restServis = environment.restServis;
  korisnici?: Array<IKoriskik>;

  constructor() { }

  async dajJWT() : Promise<string> {
    let odgovor = await (await fetch(this.restServis + "/getJWT")).text();
    let rezultat = JSON.parse(odgovor);
    if ('ok' in rezultat) {
      return rezultat.ok;
    }
    else {
      return '';
    }
  }
  async registrirajKorisnika(tijelo: string): Promise<boolean>{
    let token = await this.dajJWT();
            
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    zaglavlje.set("Authorization", token);

      let odgovorRegistriraj = await fetch("/baza/korisnici", {
        method: "POST",
        headers: zaglavlje,
        body: tijelo
      });

      if(odgovorRegistriraj.status == 201){
        return true;
      }
    return false;
  }
  async prijaviKorisnika(tijelo: string, korime: string) : Promise<boolean>{
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let odgovorPrijavi = await fetch("/baza/korisnici/" + korime + "/prijava", {
        method: "POST",
        headers: zaglavlje,
        body: tijelo
    });
    if(odgovorPrijavi.status == 201){
      return true;
    }
    return false;
  }

  async dohvatiKorisnike():Promise<Array<IKoriskik>>{
    let odgovor = (await fetch(this.restServis + "/baza/korisnici"));
    if(odgovor.status == 200){
      let podaci = JSON.parse(await odgovor.text()) as Array<IKoriskik>;
        this.korisnici = podaci;
        
      

      let dohvaceniKorisnici: Array<IKoriskik> = [];

      for(let k of this.korisnici!){
          let korisnik: IKoriskik ={
            idKorisnika: k.idKorisnika,
            ime: k.ime,
            prezime: k.prezime,
            adresa: k.adresa,
            zvanje : k.zvanje,
            spol: k.spol,
            email: k.email,
            korIme: k.korIme,
            lozinka: k.lozinka,
            uloge_korisnika_id: k.uloge_korisnika_id
          };
          dohvaceniKorisnici.push(korisnik);
      }
      return dohvaceniKorisnici;
    }
    return [];
  }
  async obrisiKorisnika(korime: string): Promise<boolean>{
    let token = await this.dajJWT();
            
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    zaglavlje.set("Authorization", token);

      let odgovorRegistriraj = await fetch("/baza/korisnici/" + korime, {
        method: "DELETE",
        headers: zaglavlje
      });

      if(odgovorRegistriraj.status == 201){
        return true;
      }
    return false;
  }
}
