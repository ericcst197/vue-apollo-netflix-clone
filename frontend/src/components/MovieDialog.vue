<script setup lang="ts">
import { ref } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
import Button from "~/components/Button.vue";
import SvgIcon from "~/components/SvgIcon.vue";
import TitleValueModal from "~/components/TitleValueModal.vue";

// Helper
import YouTubePlayer from 'youtube-player';
import moment from 'moment';

// Types
import type { movie } from "~/types/movie"

// Icons
import CloseIcon from "~/assets/icons/close-01.svg"
import SoundOnIcon from "~/assets/icons/sound-on.svg";
import SoundOffIcon from "~/assets/icons/sound-off.svg";
import ReplayIcon from "~/assets/icons/replay-icon.svg";
import PlayIcon from "~/assets/icons/play-01.svg";

// DIALOG STATES (START)
interface Props {
    open?: boolean,
    movieToShow: movie,
}

const { open, movieToShow } = defineProps<Props>()

const emits = defineEmits<{
    (e: 'close'): void
}>()
// DIALOG STATES (END)
const imgUrl = ref('https://image.tmdb.org/t/p/original')

const dialogMoviePlayer = ref<any>()

const movieShown = ref<HTMLDivElement | null>(null)
const movieShownState = ref<number>(-1)

const isMovieShownPlayed = ref(false)
const movieShownComponentKey = ref(0)
const movieShownButtonIcon = ref(SoundOffIcon)
const movieShownButtonIconComponentKey = ref(0)

async function muteSound () {
    if(!isMovieShownPlayed.value && movieShownButtonIcon.value === ReplayIcon) {
        dialogMoviePlayer.value.playVideo();
        dialogMoviePlayer.value.unMute()
        movieShownButtonIcon.value = SoundOnIcon
        movieShownButtonIconComponentKey.value++
        return
    }

    if(await dialogMoviePlayer.value.isMuted()) {
        dialogMoviePlayer.value.unMute()
        movieShownButtonIcon.value = SoundOnIcon
    } else {
        dialogMoviePlayer.value.mute()
        movieShownButtonIcon.value = SoundOffIcon
    }
    movieShownButtonIconComponentKey.value++
}

function extractNumber(inputString: string) {
    let matchResult = inputString.match(/\d+/);
    let extractedNumber;

    if (matchResult !== null) {
        extractedNumber = parseInt(matchResult[0]);
    } else {
        // Handle the case when no match is found
        return undefined; // Or any default value you prefer
    }

    return extractedNumber;
}

watch(movieShown, () => {
    if (movieShown.value) {
        dialogMoviePlayer.value = YouTubePlayer(movieShown.value as HTMLElement, {
            videoId: movieToShow?.video.clip || movieToShow?.video.teaser || movieToShow?.video.trailer,
            playerVars: {
                autoplay: 1,
                controls: 0,
                rel: 0,
                cc_lang_pref: "en",
            }
        }, true);

        dialogMoviePlayer.value.on('ready', async function () {
            dialogMoviePlayer.value.mute()
            document.querySelector('#player-2')?.setAttribute('style', 'opacity: 1')
        });
    }
})

watch(dialogMoviePlayer, () => {
    dialogMoviePlayer.value.on('stateChange', (event) => {
        movieShownState.value = event.data
        switch (event.data) {
            case 1:
                isMovieShownPlayed.value = true
                break;
            case 0:
                isMovieShownPlayed.value = false
                movieShownButtonIcon.value = ReplayIcon
                movieShownButtonIconComponentKey.value++
                break;
            default:
                isMovieShownPlayed.value = false
                movieShownButtonIcon.value = SoundOffIcon
        }
    });
})



watch(isMovieShownPlayed, () => {
    if (!isMovieShownPlayed.value) {
        document.querySelector('#player-2')?.setAttribute('style', 'opacity: 0')
    } else {
        document.querySelector('#player-2')?.setAttribute('style', 'opacity: 1')
    }
    movieShownComponentKey.value++
})

</script>


<template>
    <TransitionRoot :show="open" as="template">
        <Dialog as="div" :open="open" @close="emits('close')" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/75" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-start justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-4xl min-h-screen transform overflow-hidden rounded-2xl bg-[#181818] text-white text-left align-middle shadow-xl transition-all">
                            <div class="relative w-full h-[45vw] desktop:h-[35vw] transition-opacity duration-500">
                                <div @click="emits('close')"
                                    class="z-10 absolute top-4 right-4 flex items-center justify-center h-10 w-10 rounded-full bg-[#181818] cursor-pointer">
                                    <SvgIcon :src="CloseIcon" :height="20" :width="20" />
                                </div>
                                <img :key="movieShownComponentKey"
                                    :src="movieToShow.image ? imgUrl + movieToShow.image : ''"
                                    class="absolute inset-0 transition-opacity duration-500"
                                    :class="[!isMovieShownPlayed ? 'opacity-100' : 'opacity-0']" />
                                <!-- Movie Player -->
                                <div class="absolute inset-0">
                                    <div id="player-2" ref="movieShown" class="w-full h-full"></div>
                                </div>
                                 <!-- Overlay shadow gradient 1 -->
                                <div v-if="!isMovieShownPlayed" class="absolute inset-0 bg-gradient-to-r from-[#181818] via-transparent to-[#181818]"></div>
                                <!-- Movie details -->
                    <div ref="fill-container" class="absolute inset-0">
                        <div ref="info" class="absolute left-[4%] flex flex-col justify-end h-full w-[35%] pb-10 z-10 text-white">
                            <div ref="logoAndText" class="w-full">
                                <!-- <div class="origin-bottom-left rotate-z-0 scale-100 delay-0 duration-[1300ms] pb-[1.2vw] min-h-[13.2vw]"> -->
                                <div class="duration-[1300ms] origin-bottom-left mb-[1vw]"
                                    :style="{
                                        'width': '100%'
                                    }">
                                    <img :src="movieToShow.logo ? imgUrl + movieToShow.logo.file_path : ''" />
                                </div>
                                <div ref="buttons-layer" class="flex flex-row w-full mt-[1.5vw] whitespace-nowrap">
                                    <Button mode="secondary" class="z-[5] px-5 mr-2 desktop:px-6">
                                        <template #left>
                                            <SvgIcon :src="PlayIcon" :height="30" :width="30" />
                                        </template>
                                        <span class="font-medium text-base desktop:text-xl">Play</span>
                                    </Button>

                                </div>
                            </div>
                        </div>
                        <div ref="sound" class="absolute right-[4%] bottom-0 flex flex-row items-center justify-end pb-12 z-10 text-white opacity-50">
                            <Button ref="mute" mode="template" @click="muteSound" class="!p-1 !min-h-0 w-7 h-7 outline outline-2 outline-white rounded-full mr-[1.1vw]"
                                left-class="!mr-0">
                                <template #left>
                                    <SvgIcon :key="movieShownButtonIconComponentKey" :src="movieShownButtonIcon"
                                        :height="20" :width="20" class="stroke-2" />
                                </template>
                            </Button>
                            <!-- <span
                                class="flex items-center bg-[#333]/60 border-l-[3px] border-[#dcdcdc] border-solid py-[0.5vw] pr-[3.5vw] pl-[0.8vw] h-[2.4vw] text-[1.1vw]">
                                <span>{{ movieToShow.age_restrict || "G" }}</span>
                            </span> -->
                        </div>
                    </div>
                            </div>
                            <div ref="detail-modal-container" class="block px-[3em]">
                                <div ref="preview-modal-wrapper" class="flex flex-col gap-y-2">
                                    <div class="flex flex-col my-3">
                                        <span class="max-w-[300px] text-[#46d369]">{{
                                            movieToShow.status }}</span>
                                        <div class="flex gap-3 mb-2 text-[#bcbcbc]">
                                            <span ref="year">{{ moment(movieToShow.year).year() }}</span>
                                            <span ref="duration">{{
                                                moment.duration(movieToShow.runtime, 'minutes').hours()
                                            }}h {{
                                                    moment.duration(movieToShow.runtime, 'minutes').minutes()
                                                }}m</span>
                                        </div>
                                        <div>
                                            <span class="p-1 border border-solid border-[#bcbcbc] rounded-sm">{{
                                                movieToShow.age_restrict }}</span>
                                        </div>
                                    </div>
                                    <p class="text-sm my-2">
                                        {{ movieToShow.description }}
                                    </p>
                                </div>
                                <div ref="about-wrapper">
                                    <div ref="about-header" class="flex flex-col gap-y-2 mt-8 mb-4">
                                        <h3 class="text-2xl">About <strong>{{ movieToShow.title }}</strong></h3>
                                    </div>
                                    <div ref="about-container" class="pb-8">
                                        <TitleValueModal title="Director" :value="movieToShow.director" />
                                        <TitleValueModal title="Cast"
                                            :value="movieToShow.casts.map(cast => cast.name || cast.original_name).join(', ') || '-'" />
                                        <TitleValueModal title="Writer"
                                            :value="movieToShow.writers.map(cast => cast.name || cast.original_name).join(', ') || '-'" />
                                        <TitleValueModal title="Genres" :value="movieToShow.genre.join(', ')" />
                                        <TitleValueModal title="Maturity rating" :value="movieToShow.age_restrict +
                                            `. Recommended for ${extractNumber(movieToShow.age_restrict)
                                                ? 'ages ' + extractNumber(movieToShow.age_restrict) + ' and up'
                                                : 'all ages'}`
                                            " />
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
