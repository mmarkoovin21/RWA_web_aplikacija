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
  private serije = new Array<ISerije>();
  constructor() {
    // let serije = localStorage.getItem('serije');
    // if (serije != null) this.serijeTMDB = JSON.parse(serije);
    // else this.osvjeziFilmove(1, 'the');
  }
  async osvjeziFilmove(stranica: number, kljucnaRijec: string) {
    let parametri = '?stranica=' + stranica + '&trazi=' + kljucnaRijec;
    let o = (await fetch(
      this.restServis + 'tmdb/serije' + parametri
    )) as Response;
    if (o.status == 200) {
      let r = JSON.parse(await o.text()) as ISerijeTmdb;
      console.log(r);
      this.serijeTMDB = r;
      //localStorage.setItem('serije', JSON.stringify(r));
    }
  }

  dajFilmove(): Array<ISerije> {
    if (this.serije.length == 0) {
      if (this.serijeTMDB == undefined) {
        return new Array<ISerije>();
      } else if (this.serijeTMDB.results.length == 0) {
        return new Array<ISerije>();
      } else {
        this.serije = new Array<ISerije>();
        for (let serijaTMDB of this.serijeTMDB.results) {
          let serija: ISerije = {
            naziv: serijaTMDB.original_name,
            opis: serijaTMDB.overview,
          };
          this.serije.push(serija);
        }
        return this.serije;
      }
    } else {
      return this.serije;
    }
  }
  dajSeriju(naziv: String): ISerijaTmdb| null {
    if (this.serijeTMDB == undefined) return null;
    if (this.serijeTMDB.results.length == 0) return null;
    for (let serija of this.serijeTMDB.results) {
      if (serija.original_name == naziv) {
        return serija;
      }
    }
    return null;
  }
}
