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
            korime: k.korime,
            lozinka: k.lozinka,
            uloge_korisnika_id: k.uloge_korisnika_id
          };
          dohvaceniKorisnici.push(korisnik);
      }
      return dohvaceniKorisnici;
    }
    return [];
  }
}
