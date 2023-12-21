export interface ISerijeTmdb{
    page: number;
    results: Array<ISerijaTmdb>;
    total_pages: number;
    total_results: number;
}

export interface ISerijaTmdb{
    id: number;
    name: string;
    adult: boolean;
    backdrop_path: string;
    created_by: any
    episode_run_time: Array<number>;
    first_air_date: string;
    genres: any;
    homepage: string;
    in_production: boolean;
    languages: Array<string>;
    last_air_date: string;
    last_episode_to_air: any;
    next_episode_to_air: string;
    networks: any;
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: Array<string>;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: any;
    production_countries: any;
    seasons: any;
    spoken_languages: any;
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}