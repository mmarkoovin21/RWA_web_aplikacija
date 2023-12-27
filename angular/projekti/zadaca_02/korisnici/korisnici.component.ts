import { Component, OnInit } from '@angular/core';
import { IKoriskik } from '../src/interfaces/IKorisnici';
import { KorisniciService } from '../src/servisi/korisnici.service';

@Component({
    selector: 'app-korisnici',
    templateUrl: './korisnici.component.html',
    styleUrl: './korisnici.component.scss',
})
export class KorisniciComponent implements OnInit{
    korisnici = new Array<IKoriskik>;

    constructor(private korisnikServis: KorisniciService){}
    ngOnInit(): void {
        this.korisnikServis.dohvatiKorisnike().then((k)=>{
            this.korisnici = k;
        });
    }
    obrisiKorisnika(id: number) {
        throw new Error('Method not implemented.');
        }
}
