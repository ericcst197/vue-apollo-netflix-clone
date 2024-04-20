import { defineStore } from "pinia";
import { getMovieDetail } from "~/helpers/movie"

export const useFetchMoviesStore = defineStore("themoviedb", () => {
    const apiKey = import.meta.env.VUE_APP_TMDB_API_KEY;
    const baseUrl = import.meta.env.VUE_APP_TMDB_BASE_URL;
    const requests = {
        trending: ['/trending/movie/week?api_key=','&language=en-US'],
        netflixOriginals: ['/discover/movie?api_key=','&with_networks=213'],
        topRated: ['/movie/top_rated?api_key=','&language=en-US'],
        action: ['/discover/movie?api_key=','&with_genres=28'],
        comedy: ['/discover/movie?api_key=','&with_genres=35'],
        horror: ['/discover/movie?api_key=','&with_genres=27'],
        romance: ['/discover/movie?api_key=','&with_genres=10749'],
        music: ['/discover/movie?api_key=','&with_genres=10402'],
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

        return getMovieDetail(results[0].id)
    }

    return { getMoviesList, moviesList, getPopularMovie }
});
