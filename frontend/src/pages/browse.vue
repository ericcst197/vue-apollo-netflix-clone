<script setup lang="ts">
import ProfileHeader from "~/components/header/ProfileHeader.vue";
import ProfileFooter from "~/components/footer/ProfileFooter.vue";
import Button from "~/components/Button.vue";
import SvgIcon from "~/components/SvgIcon.vue";
import MovieDialog from "~/components/MovieDialog.vue";
import { VueperSlides, VueperSlide } from "vueperslides"

// Composable
import { useFetchMoviesStore } from "~/pinia/movie";
import { useBreakpoints } from "~/composables/breakpoints";

// Helpers
import YouTubePlayer from 'youtube-player';
import { formatCamelCaseToSentence } from "~/helpers/string";
import { getMovieDetail } from "~/helpers/movie";

// Icon
import ChevronRight from "~/assets/icons/chevron-right.svg";
import ChevronLeft from "~/assets/icons/chevron-left.svg";
import PlayIcon from "~/assets/icons/play-01.svg";
import InfoCircleIcon from "~/assets/icons/info-circle-01.svg";
import SoundOnIcon from "~/assets/icons/sound-on.svg";
import SoundOffIcon from "~/assets/icons/sound-off.svg";
import ReplayIcon from "~/assets/icons/replay-icon.svg"

// Types
import type { movie } from "~/types/movie"

// Composable Instances
const { widthBreaks, smaller } = useBreakpoints();
const { getMoviesList, moviesList, getPopularMovie } = useFetchMoviesStore()

/* STATES: CORE (START) */
const state = ref<"choose-profile" | "movies">("choose-profile")

const isFetchMovieListLoading = ref(true)
const isFirstLoad = ref(true)

const genres = ref([
    'trending',
    'netflixOriginals',
    'topRated',
    'action',
    'comedy',
    'horror',
    'romance',
    'music'
]);

const movies = computed(() => {
    if(!isFetchMovieListLoading.value) {
        const slicedResult = Object.entries(moviesList).slice().map((genre: [string, any], index) => {
            if(smaller('tablet')) {
                // Slice out 20 movies to 18 movies to fit with vueperslides, refer to slidesSettings
                return [genre[0], Object.fromEntries(Object.entries(genre[1]).slice(0, 18))]
            } else return genre
        })

        return Object.fromEntries(slicedResult)
    }

    return moviesList
})

const movieToday = ref<movie>()

const imgUrl = ref('https://image.tmdb.org/t/p/original')

/**
 * Vueperslide slides settings
 */
const slidesSettings = {
    [widthBreaks['desktop-xl']]:{
        visibleSlides: 5,
        arrowsOutside: true,
        slideRatio: 1/8,
    },
    [widthBreaks.desktop]: {
        visibleSlides: 5,
        arrowsOutside: true,
        slideRatio: 1/8,
    },
    [widthBreaks.laptop]: {
        visibleSlides: 4,
        arrowsOutside: false,
        slideRatio: 1/6,
    },
    [widthBreaks.tablet]: {
        visibleSlides: 3,
        arrowsOutside: false,
        slideRatio: 1/4,
    },
    [widthBreaks['tablet-sm']]: {
        visibleSlides: 3,
        arrowsOutside: false,
        slideRatio: 1/4,
    }
}
/* STATES: CORE (END)*/

/*
 * Youtube player instance (START)
 */
/**
 * Header movie template ref
 */
const headerMovie = ref<HTMLDivElement | null>(null)

/**
 * Youtube API player instance
 */
const moviePlayer = ref<any>()
const isMovieTodayPlayed = ref(false)
/**
 * Youtube API player.getPlayerState():Number
    Returns the state of the player. Possible values are:
    -1 – unstarted
    0 – ended
    1 – playing
    2 – paused
    3 – buffering
    5 – video cued
 */
const movieTodayState = ref<number>(-1)
const movieTodayComponentKey = ref(0)
const buttonIcon = ref(SoundOffIcon)
const buttonIconComponentKey = ref(0)

async function muteSound () {
    if(!isMovieTodayPlayed.value && buttonIcon.value === ReplayIcon) {
        moviePlayer.value.playVideo();
        moviePlayer.value.unMute()
        buttonIcon.value = SoundOnIcon
        buttonIconComponentKey.value++
        return
    }

    if(await moviePlayer.value.isMuted()) {
        moviePlayer.value.unMute()
        buttonIcon.value = SoundOnIcon
    } else {
        moviePlayer.value.mute()
        buttonIcon.value = SoundOffIcon
    }
    buttonIconComponentKey.value++
}

/*
* Youtube player instance (END)
*/

/*
* Movie Dialog (START)
*/
/**
 * Selected movie template ref
 */
const isMovieDialogShown = ref(false)

const movieIdToShow = ref<string | number>("")
const movieToShow = ref<movie>()

function toggleMovieDialog(movieId?: string | number ) {
    // Reset for rehydration
    movieToShow.value = undefined
    movieIdToShow.value = ""

    if(movieId) {
        movieIdToShow.value = movieId
    }

    isMovieDialogShown.value = !isMovieDialogShown.value
}

/*
* Movie Dialog (END)
*/

/* WATCHER */
watch(headerMovie, () => {
    if(headerMovie.value) {
        moviePlayer.value = YouTubePlayer(headerMovie.value as HTMLElement, {
            videoId: movieToday.value?.video.clip || movieToday.value?.video.teaser,
            playerVars: {
                autoplay: 1,
                controls: 0,
                rel: 0,
                cc_lang_pref: "en",
            }
        }, true);

        moviePlayer.value.on('ready', async function () {
            moviePlayer.value.mute()
            document.querySelector('#player-1')?.setAttribute('style', 'opacity: 1')
        });

        moviePlayer.value.on('stateChange', (event) => {
            isFirstLoad.value = false
            movieTodayState.value = event.data
            switch(event.data) {
                case 1 :
                    isMovieTodayPlayed.value = true
                    break;
                case 0 :
                    isMovieTodayPlayed.value = false
                    buttonIcon.value = ReplayIcon
                    buttonIconComponentKey.value++
                    break;
                default :
                    isMovieTodayPlayed.value = false
                    buttonIcon.value = SoundOffIcon
            }
        });
    }
})

watch(isMovieTodayPlayed, () => {
    if(!isMovieTodayPlayed.value) {
        document.querySelector('#player-1')?.setAttribute('style', 'opacity: 0')
    } else {
        document.querySelector('#player-1')?.setAttribute('style', 'opacity: 1')
    }
    movieTodayComponentKey.value++
})

watch(movieIdToShow, async () => {
    if(movieIdToShow.value) {
        moviePlayer.value.pauseVideo()
        movieToShow.value = await getMovieDetail(movieIdToShow.value)
    } else if (!movieIdToShow.value && movieTodayState.value === 2) {
        moviePlayer.value.playVideo()
    }
})
/* WATCHER */

onMounted(async() => {
    isFetchMovieListLoading.value = true
    movieToday.value = await getPopularMovie()
    for(let genre of genres.value) {
        await getMoviesList(genre)
    }

    isFetchMovieListLoading.value = false
})
</script>

<template>
    <template v-if="state === 'choose-profile'">
        <div class="fixed inset-0 bg-[#141414] text-center">
            <div class="absolute inset-0 animate-profile flex flex-col items-center justify-center z-[100]">
                <div>
                    <div class="my-4">
                        <h1 class="text-white text-[3.5vw]">Who's watching</h1>
                    </div>
                    <ul class="flex flex-row my-4">
                        <li v-for="index in 3" class="mr-[2vw] last:mr-0 cursor-pointer text-gray-400 hover:text-white" :key="index"
                            @click="state ='movies'">
                            <div class="">
                                <div class="w-[10vw] h-[10vw] bg-green-300 rounded"></div>
                                <span class="block text-center my-2.5 ">{{ index }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </template>
    <template v-if="state ==='movies'">
        <div class="bg-[#141414]">
            <ProfileHeader class="z-20" />

            <!-- Movie Container -->
            <div class="relative top-0 inset-x-0 pb-[40%] mb-5">
                <div v-if="movieToday" class="absolute inset-0 h-[56.25vw]">
                    <img :key="movieTodayComponentKey" :src="movieToday.image? imgUrl + movieToday.image : ''"
                        class="absolute w-full h-full transition-opacity duration-500"
                        :class="[!isMovieTodayPlayed ? 'opacity-100' : 'opacity-0']" />
                    <!-- Movie Player -->
                    <div id="player-1" ref="headerMovie" class="absolute w-full h-full laptop:bottom-20 opacity-0 transition-opacity"></div>
                    <!-- Overlay shadow gradient 1 -->
                    <div class="absolute inset-y-0 left-0 right-1/4 bg-gradient-to-r from-[#000]/40 to-transparent to-80%"></div>
                    <!-- Movie details -->
                    <div ref="fill-container" class="absolute inset-0">
                        <div ref="info" class="absolute left-[4%] bottom-[35%] top-0 flex flex-col justify-end w-[36%] z-10 text-white">
                            <div ref="logoAndText" class="w-full">
                                <!-- <div class="origin-bottom-left rotate-z-0 scale-100 delay-0 duration-[1300ms] pb-[1.2vw] min-h-[13.2vw]"> -->
                                <div class="duration-[1300ms] origin-bottom-left mb-[1vw]"
                                    :class="[isFirstLoad ? '' : isMovieTodayPlayed ? 'video-played-logo' :'video-stopped-logo']"
                                    :style="{
                                        'width': '70%'
                                    }">
                                    <img :src="movieToday.logo ? imgUrl + movieToday.logo.file_path : ''" />
                                </div>
                                <div ref="info-wrapper" class="w-full h-20 duration-[1300ms]"
                                    :class="[isFirstLoad ? '' : isMovieTodayPlayed ? 'video-played-info' :'video-stopped-info']">
                                    <p class="h-full text-[1.2vw] laptop:leading-7 line-clamp-3">{{
                                        movieToday.description
                                    }}</p>
                                </div>
                                <div ref="buttons-layer" class="flex flex-row w-full mt-[1.5vw] whitespace-nowrap">
                                    <Button mode="secondary" class="z-[5] px-5 mr-2 desktop:px-6">
                                        <template #left>
                                            <SvgIcon :src="PlayIcon" :height="30" :width="30" />
                                        </template>
                                        <span class="font-medium text-base desktop:text-xl">Play</span>
                                    </Button>
                                    <Button @click="toggleMovieDialog(movieToday?.id)" mode="secondary-gray" class="z-[5] px-5 mr-2 desktop:px-6">
                                        <template #left>
                                            <SvgIcon :src="InfoCircleIcon" :height="24" :width="24" />
                                        </template>
                                        <span class="font-medium  text-xs tablet:text-base text-white desktop:text-xl">More Info</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div ref="sound" class="absolute right-0 bottom-[35%] flex flex-row items-center justify-end z-10 text-white">
                            <Button ref="mute" mode="template" @click="muteSound" class="!p-1 !min-h-0 w-7 h-7 outline outline-2 outline-white rounded-full mr-[1.1vw]"
                                left-class="!mr-0">
                                <template #left>
                                    <SvgIcon :key="buttonIconComponentKey" :src="buttonIcon" :height="20" :width="20"
                                        class="stroke-2" />
                                </template>
                            </Button>
                            <span
                                class="flex items-center bg-[#333]/60 border-l-[3px] border-[#dcdcdc] border-solid py-[0.5vw] pr-[3.5vw] pl-[0.8vw] h-[2.4vw] text-[1.1vw]">
                                <span>{{ movieToday.age_restrict || "G" }}</span>
                            </span>
                        </div>
                    </div>
                    <!-- Overlay shadow gradient 2 -->
                    <div class="absolute w-full h-[14.7vw] top-auto bottom-0 bg-transparent bg-gradient-to-b from-transparent to-[#141414] to-50%"></div>
                </div>
            </div>

            <!-- Movie lists -->
            <div class="relative bg-transparent text-white min-h-[1000px] border-box pb-12">
                <div v-for="(genre, index) in genres" class="my-[3vw]">
                    <h3 class="font-medium text-xs laptop:text-[1.4vw] min-w-[6em] w-fit text-[#e5e5e5] mx-[4%] mb-[0.75em]">{{ formatCamelCaseToSentence(genre) }}</h3>
                    <VueperSlides class="relative no-shadow px-4 laptop:px-16" :breakpoints="slidesSettings"
                        :visible-slides="5" :slide-ratio="1/8" :arrows-outside="true" slide-multiple :gap="1"
                        :bullets="false" :touchable="false">
                            <template #arrow-left>
                                <img :src="ChevronLeft" class="stroke-[3px] stroke-white h-4 w-4 tablet:h-6 tablet:w-6 mb-4 laptop:h-10 laptop:w-10 desktop:mb-6"/>
                            </template>

                            <template #arrow-right>
                                <img :src="ChevronRight" class="stroke-[3px] stroke-white h-4 w-4 tablet:h-6 tablet:w-6 mb-4 laptop:h-10 laptop:w-10 desktop:mb-6"/>
                            </template>

                            <VueperSlide v-for="(movie, i) in movies[genre]" :key="movie.id">
                                <template #content>
                                    <div class="flex flex-col justify-center w-full cursor-pointer overflow-hidden text-center">
                                        <img :src="imgUrl + movie.backdrop_path" alt="" @click="toggleMovieDialog(movie.id)"
                                            class="h-full object-cover object-center mx-auto rounded-lg" />
                                        <p class="text-xs desktop:text-base truncate">{{ movie.title || movie.name }}</p>
                                    </div>
                                </template>
                            </VueperSlide>
                    </VueperSlides>
                </div>
            </div>
            <ProfileFooter />

            <!-- Movie dialog -->
            <template v-if="movieToShow">
                <MovieDialog :title="movieToShow.title" :movie-to-show="movieToShow"
                    :open="isMovieDialogShown" @close="toggleMovieDialog">
                </MovieDialog>
            </template>
        </div>
    </template>
</template>

<style scoped>
.animate-profile {
    animation: animateProfileGate 0.45s forwards
}

@keyframes animateProfileGate {
    from {
        opacity: 0;
        transform: scale(1.1);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.video-played-logo {
    animation: videoPlayedLogo 1300ms 3000ms forwards;
}

.video-stopped-logo {
    animation: videoStoppedLogo 1300ms forwards;
}

@keyframes videoPlayedLogo {
    from {
        transform: scale(1) translate3d(0px, 0px, 0px);
        /* transition-delay: 0ms; */
    }
    to {
        transform: scale(0.6) translate3d(0px, 150px, 0px);
        /* transition-delay: 5000ms; */
    }
}

@keyframes videoStoppedLogo {
    from {
        transform: scale(0.6) translate3d(0px, 150px, 0px);
        /* transition-delay: 5000ms; */
    }
    to {
        transform: scale(1) translate3d(0px, 0px, 0px);
        /* transition-delay: 0ms; */
    }
}

.video-played-info {
    animation: videoPlayedInfo 1300ms 3000ms forwards;
}

.video-stopped-info {
    animation: videoStoppedInfo 1300ms forwards;
}

@keyframes videoPlayedInfo {
    from {
        transform: translate3d(0px, 0px, 0px);
        opacity: 1;
    }
    to {
        transform: translate3d(0px, 57.6px, 0px);
        opacity: 0;
    }
}

@keyframes videoStoppedInfo {
    from {
        transform: translate3d(0px, 57.6px, 0px);
        opacity: 0;
    }
    to {
        transform: translate3d(0px, 0px, 0px);
        opacity: 1;
    }
}
</style>
