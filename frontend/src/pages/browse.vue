<script setup lang="ts">
import ProfileHeader from '~/components/header/ProfileHeader.vue';
import SvgIcon from '~/components/SvgIcon.vue';
import { VueperSlides, VueperSlide } from 'vueperslides'
import Button from '~/components/Button.vue';

// Composable
import { useFetchMoviesStore } from '~/pinia/movie'
import { useBreakpoints } from "~/composables/breakpoints";

// Helpers
import { formatCamelCaseToSentence } from "~/helpers/string"

// Icon
import ChevronRight from '~/assets/icons/chevron-right.svg';
import ChevronLeft from '~/assets/icons/chevron-left.svg';
import PlayIcon from '~/assets/icons/play-01.svg';
import InfoCircleIcon from '~/assets/icons/info-circle-01.svg';

// Types
import type { movie } from "~/types/movie"

// Composable Instances
const { widthBreaks, smaller } = useBreakpoints();
const { getMoviesList, moviesList, getPopularMovie } = useFetchMoviesStore()

const genres = ref([
    'trending',
    'netflixOriginals',
    'topRated',
    'action',
    'comedy',
    'horror',
    'romance',
    'documentaries'
]);

/* STATES */
const isFetchMovieListLoading= ref(true)

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

const movieTodayComponentKey = ref(0)
const movieToday = ref<movie>()

watchEffect(() => {
    console.log(
        movieTodayComponentKey.value,
        movieToday.value
    )
})

const movieLogo = ref("https://occ-0-2204-64.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABTM35tB8ZCEz3It1hnlerEVtIXkWYvhzB3olwDsnXlM028iXpTtKh6kdRhFQHgDL7fET5knv5_d4VNClVwGFRk0mESR8xTDcjSNWO_AEIo0f.webp?r=6f6")
const imgUrl = ref('https://image.tmdb.org/t/p/original')

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
/* STATES */

const isFiveSeconds = ref(false)

function countDown(seconds) {
    let timer = setInterval(function() {
        if (seconds <= 0) {
            clearInterval(timer);
            console.log("Countdown complete!");
            isFiveSeconds.value = true
        } else {
            console.log(seconds + " seconds remaining");
            seconds--;
        }
    }, 1000);
}

onMounted(async() => {
    isFetchMovieListLoading.value = true
    movieToday.value = await getPopularMovie()
    for(let genre of genres.value) {
        await getMoviesList(genre)
    }

    isFetchMovieListLoading.value = false
    countDown(4)
})

</script>

<template>
    <ProfileHeader class="z-20" />
    <div class="relative top-0 inset-x-0 pb-[40%] mb-5">
        <div :key="movieTodayComponentKey" v-if="movieToday" class="absolute inset-0 h-[56.25vw]">
            <img class="absolute w-full h-full" :src="movieToday.image? imgUrl + movieToday.image : ''" />
            <div class="absolute inset-y-0 left-0 right-1/4 bg-gradient-to-r from-[#000]/40 to-transparent to-80%"></div>
            <div ref="fill-container" class="absolute inset-0">
                <div ref="info" class="absolute left-[4%] bottom-[35%] top-0 flex flex-col justify-end w-[36%] z-10 text-white">
                    <div ref="logo-and-text" class="w-full">
                        <!-- <div class="origin-bottom-left rotate-z-0 scale-100 delay-0 duration-[1300ms] pb-[1.2vw] min-h-[13.2vw]"> -->
                        <div class="video-stopped-logo duration-[1300ms] origin-bottom-left mb-[1vw]">
                            <img :src="movieToday.logo ? imgUrl + movieToday.logo.file_path : ''" />
                        </div>
                        <div ref="info-wrapper" class="video-stopped-info duration-[1300ms]">
                            <p class="text-[1.2vw] laptop:leading-7">{{
                                movieToday.description
                            }}</p>
                        </div>
                        <div ref="buttons-layer" class="flex flex-row w-full mt-[1.5vw] whitespace-nowrap">
                            <Button mode="secondary" class="px-6 mr-2">
                                <template #left>
                                    <SvgIcon :src="PlayIcon" :height="24" :width="24" />
                                </template>
                                <span class="font-medium text-base">Play</span>
                            </Button>
                            <Button mode="secondary-gray" class="px-6 mr-2 ">
                                <template #left>
                                    <SvgIcon :src="InfoCircleIcon" :height="24" :width="24" />
                                </template>
                                <span class="font-medium text-base text-white">More Info</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="absolute w-full h-[14.7vw] top-auto bottom-0 bg-transparent bg-gradient-to-b from-transparent to-[#141414] to-50%"></div>
        </div>
    </div>
    <div class="relative bg-transparent text-white min-h-[1000px] border-box">
        <div></div>
        <div v-for="(genre, index) in genres" class="my-[3vw]">
            <h3 class="font-medium text-xs laptop:text-[1.4vw] min-w-[6em] w-fit text-[#e5e5e5] mx-[4%] mb-[0.75em]">{{ formatCamelCaseToSentence(genre) }}</h3>
            <VueperSlides class="relative no-shadow px-4 laptop:px-16" :breakpoints="slidesSettings"
                :visible-slides="5" :slide-ratio="1/8" :arrows-outside="true" slide-multiple :gap="1"
                :bullets="false" :touchable="false">
                    <template #arrow-left>
                        <img :src="ChevronLeft" class="stroke-[3px] stroke-white h-4 w-4 tablet:h-6 tablet:w-6 mb-6 laptop:h-10 laptop:w-10 desktop:mb-12"/>
                    </template>

                    <template #arrow-right>
                        <img :src="ChevronRight" class="stroke-[3px] stroke-white h-4 w-4 tablet:h-6 tablet:w-6 mb-6 laptop:h-10 laptop:w-10 desktop:mb-12"/>
                    </template>

                    <VueperSlide v-for="(movie, i) in movies[genre]" :key="movie.id">
                        <template #content>
                            <div class="flex flex-col justify-center w-full cursor-pointer rounded overflow-hidden text-center">
                                <img :src="imgUrl + movie.backdrop_path" alt="" class="h-full object-cover object-center mx-auto">
                                <p class="text-xs desktop:text-base">{{ movie.title || movie.name }}</p>
                            </div>
                        </template>
                    </VueperSlide>
            </VueperSlides>
        </div>
    </div>
</template>

<style>
.video-played-logo {
    animation: video-played-logo 1300ms 5000ms forwards;
}

.video-stopped-logo {
    animation: video-played-logo 1300ms reverse;
}


@keyframes video-played-logo {
    from {
        transform: scale(1) translate3d(0px, 0px, 0px);
        /* transition-delay: 0ms; */
    }
    to {
        transform: scale(0.6) translate3d(0px, 85px, 0px);
        /* transition-delay: 5000ms; */
    }
}

.video-played-info {
    animation: video-played-info 1300ms 5000ms forwards;
}

.video-stopped-info {
    animation: video-played-info 1300ms reverse;
}

@keyframes video-played-info {
    from {
        transform: translate3d(0px, 0px, 0px);
        opacity: 1;
    }
    to {
        transform: translate3d(0px, 57.6px, 0px);
        opacity: 0;
    }
}
</style>
