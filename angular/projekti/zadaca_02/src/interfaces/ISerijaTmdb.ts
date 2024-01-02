export interface ISerijeTmdb{
    page: number;
    results: Array<ISerijaTmdb>;
    total_pages: number;
    total_results: number;
}

export interface ISerijaTmdb{
    id: number;
    name: string;
    homepage: string;
    number_of_episodes: number;
    number_of_seasons: number;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    tmdbId: number;
    seasons: any;
}