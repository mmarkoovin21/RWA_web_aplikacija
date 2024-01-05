import { AfterViewInit, Component} from '@angular/core';
import { FavoritiService } from '../src/servisi/favoriti.service';
import { IFavorit } from '../src/interfaces/IFavoriti';
import { Router } from '@angular/router';

@Component({
    selector: 'app-favoriti',
    templateUrl: './favoriti.component.html',
    styleUrl: './favoriti.component.scss',
})
export class FavoritiComponent implements AfterViewInit{
    favoriti = new Array<IFavorit>();

    constructor(
        private favoritiServis: FavoritiService,
        private router: Router
        ){}
    async ngAfterViewInit(): Promise<void> {
        this.osvjeziFavorite();
        
    }
    async osvjeziFavorite(){
        this.favoritiServis.dohvatiFavorite().then((favoriti)=>{
            this.favoriti = favoriti;
            
        });
    }
    detaljiFavorita(id: number) {
    this.router.navigate(['favoriti-detalji', id]);
    }
}
