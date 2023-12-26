import { Component, OnInit } from '@angular/core';
import { FavoritiService } from '../src/servisi/favoriti.service';
import { IFavorit } from '../src/interfaces/IFavoriti';

@Component({
    selector: 'app-favoriti',
    standalone: true,
    templateUrl: './favoriti.component.html',
    styleUrl: './favoriti.component.scss',
    imports: []
})
export class FavoritiComponent implements OnInit{
    favoriti = new Array<IFavorit>();

    constructor(private favoritiServis: FavoritiService){}
    ngOnInit(): void {
        this.favoritiServis.dohvatiFavorite().then((favoriti)=>{
            this.favoriti = favoriti;
            
        });
    }

    izbrisiFavorit(id: number) {
    }

}
