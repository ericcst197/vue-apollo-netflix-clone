export enum Movie_Genre {
    Trending = 'trending',
    NetflixOriginals = 'netflixOriginal',
    TopRated = 'topRated',
    Action = 'action',
    Comedy = 'comedy',
    Horror = 'horror',
    Romance = 'romance',
    Documentaries = 'documentaries'
}

export type movie = {
    id: string | number;
    title: string;
    description: string;
    logo: any;
    image: any;
    runtime: any;
    video: {
        clip: string;
        teaser: string
        trailer: string;
    };
    age_restrict: string;
    genre: string[];
    year: string;
    casts: any;
    status: string;
    director: string;
    writers: any;
}
