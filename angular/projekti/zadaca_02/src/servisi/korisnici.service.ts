import { Injectable } from '@angular/core';
import { IKoriskik } from '../interfaces/IKorisnici';
import { environment } from '../environments/environment';
import { JsonPipe } from '@angular/common';

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
  dekodirajBase64(data: string){
    return atob(data);
  }
  
  dajTijelo(token: any): any{
    let dijelovi = token.split(".");
    return JSON.parse(this.dekodirajBase64(dijelovi[1]));
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
      } else return false;
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
    } else return false;
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
  async dohvatiKorisnika(): Promise<IKoriskik>{
    let token = await this.dajJWT();
    let k = this.dajTijelo(token).korime;

    let odgovor = (await fetch(this.restServis + "/baza/korisnici/" + k));
      let podaci = JSON.parse(await odgovor.text());

      let korisnik: IKoriskik ={
          idKorisnika: podaci.idKorisnika,
          ime: podaci.ime,
          prezime: podaci.prezime,
          adresa: podaci.adresa,
          zvanje: podaci.zvanje,
          spol: podaci.spol,
          email: podaci.email,
          korIme: podaci.korIme,
          lozinka: podaci.lozinka,
          uloge_korisnika_id: podaci.uloge_korisnika_id
      }
    return korisnik;
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
      } else return false;
  }
  
  async azurirajKorisnika(tijelo: string): Promise<boolean>{
    let token = await this.dajJWT();
    let k = this.dajTijelo(token).korime;

    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    zaglavlje.set("Authorization", token);

    let odgovorAzuriraj = await fetch("/baza/korisnici/" + k, {
      method: "PUT",
      headers: zaglavlje,
      body: tijelo
    });
    if(odgovorAzuriraj.status == 201){
      return true;
    }else return false;
  }
}