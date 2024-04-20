import type { movie } from "~/types/movie"

const apiKey = import.meta.env.VUE_APP_TMDB_API_KEY;
const baseUrl = import.meta.env.VUE_APP_TMDB_BASE_URL;

function getMovieLogos (logos: any[]) {
    if(logos.length) {
        const filteredLogos = logos.filter(logo => logo.iso_639_1 === 'en' && logo.height < 1000 )

        if(filteredLogos.length) {
            return filteredLogos.reduce((max, current) => current.vote_count > max.vote_count ? current : max, logos[0]);
        }
    }

    return null
}

function getMovieAgeRestriction(release_dates: any[]) {
    let age_restrict = ""
    const filterResult = release_dates.find(result => {
        if(result.iso_3166_1 === 'US' || result.iso_3166_1 === 'SG') {
            if(result.release_dates.length > 0 && result.release_dates.filter(date => date.certification)) {
                return result.release_dates[0].certification
            }
        }
        return undefined
    })

    if(filterResult && filterResult.release_dates.length) {
       age_restrict = filterResult.release_dates?.filter(date => date.certification)[0].certification || undefined
    }

    return age_restrict || "7+"
}

export async function getMovieDetail(id: number | string){
    const movieDetails = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}&append_to_response=videos,images,release_dates,credits`)

    const movieDetailsResults = await movieDetails.json()

    const result: movie = {
        id: movieDetailsResults.id,
        title: movieDetailsResults.title || movieDetailsResults.name,
        description: movieDetailsResults.overview,
        logo: await getMovieLogos(movieDetailsResults.images.logos),
        image: movieDetailsResults.backdrop_path || "",
        runtime: movieDetailsResults.runtime,
        video: {
            clip: movieDetailsResults.videos.results.filter(video => {
                return video.type === 'Clip' && video.site === 'YouTube'
            })[1]?.key || undefined,
            teaser: movieDetailsResults.videos.results.filter(video => {
                return video.type === 'Teaser' && video.site === 'YouTube'
            })[0]?.key || undefined,
            trailer: movieDetailsResults.videos.results.filter(video => {
                return video.type === 'Trailer' && video.site === 'YouTube'
            })[0]?.key || undefined
        },
        age_restrict: getMovieAgeRestriction(movieDetailsResults.release_dates.results),
        genre: movieDetailsResults.genres.map(genre => genre.name),
        status: movieDetailsResults.status,
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

