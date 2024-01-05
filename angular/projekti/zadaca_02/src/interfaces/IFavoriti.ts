export interface IFavorit{
    idSerije: number;
    naziv: string;
    opis: string;
    brojSezona: number;
    brojEpizoda: number;
    popularnost: number;
    putanjaSlike: string;
    vanjskaStranica: string;
    tmdbId: number;
}
export interface ISezona{
    naziv: string;
    opis: string;
    putanjaPostera: string;
    brojSezone: number;
    brojEpizoda: number;
}