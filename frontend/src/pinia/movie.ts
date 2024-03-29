import { defineStore } from "pinia";

export const useFetchMoviesStore = defineStore("themoviedb", () => {
    const apiKey = import.meta.env.VUE_APP_TMDB_API_KEY;
    const baseUrl = import.meta.env.VUE_APP_TMDB_BASE_URL;
    const requests = {
        trending: ['/trending/all/week?api_key=','&language=en-US'],
        netflixOriginals: ['/discover/tv?api_key=','&with_networks=213'],
        topRated: ['/movie/top_rated?api_key=','&language=en-US'],
        action: ['/discover/movie?api_key=','&with_genres=28'],
        comedy: ['/discover/movie?api_key=','&with_genres=35'],
        horror: ['/discover/movie?api_key=','&with_genres=27'],
        romance: ['/discover/movie?api_key=','&with_genres=10749'],
        documentaries: ['/discover/movie?api_key=','&with_genres=99'],
    };
    const moviesList = ref({})

    async function getMoviesList(genre: string){
        const response = await fetch(
            baseUrl +
            requests[genre][0] +
            apiKey +
            requests[genre][1]
        );

        const { results } = await response.json()
        const filteredResult = results.filter(movie => movie.backdrop_path)

        moviesList.value[genre] = {
            ...filteredResult,
        };
    }

    async function getPopularMovie(){
        const response = await fetch(
            baseUrl + '/trending/movie/day?api_key=' + apiKey + '&language=en-US&append_to_response=videos,images'
        );

        const { results } = await response.json()

        const movieDetails = await fetch(`https://api.themoviedb.org/3/movie/${results[0].id}?api_key=${apiKey}&append_to_response=videos,images,release_dates,credits`)

        const movieDetailsResults = await movieDetails.json()

        const result = {
            id: movieDetailsResults.id,
            title: movieDetailsResults.title || movieDetailsResults.name,
            description: movieDetailsResults.overview,
            logo: movieDetailsResults.images.logos.filter(logo => {
                return logo.iso_639_1 === 'en' && logo.height < 1000
            })[0],
            image: movieDetailsResults.backdrop_path || "",
            runtime: movieDetailsResults.runtime,
            video: {
                clip: movieDetailsResults.videos.results.filter(video => {
                    return video.type === 'Clip' && video.site === 'YouTube'
                })[0]?.key,
                teaser: movieDetailsResults.videos.results.filter(video => {
                    return video.type === 'Teaser' && video.site === 'YouTube'
                })[0]?.key,
                trailer: movieDetailsResults.videos.results.filter(video => {
                    return video.type === 'Trailer' && video.site === 'YouTube'
                })[0]?.key
            },
            age_restrict: movieDetailsResults.release_dates.results.find(result => {
                if(result.iso_3166_1 === 'SG' || result.iso_3166_1 === 'US') {
                    if(result.release_dates.length > 0 && result.release_dates.filter(date => date.certification)) {
                        return result.release_dates[0].certification
                    }
                }
                return undefined
            }).release_dates?.filter(date => date.certification)[0].certification || undefined,
            genre: movieDetailsResults.genres.map(genre => genre.name),
            year: movieDetailsResults.release_date,
            casts: movieDetailsResults.credits.cast.filter(cast => cast.profile_path).slice(0, 10),
            director: movieDetailsResults.credits.crew.filter(crew => crew.job === 'Director')[0].name || undefined,
            writers: movieDetailsResults.credits.crew.filter(crew =>
                    crew.department === 'Writing').filter(crew =>
                        crew.job.includes('Writer') || crew.job.includes('Story')
                    ),
        }

        return result
    }

    return { getMoviesList, moviesList, getPopularMovie }
});
