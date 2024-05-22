<script setup lang="ts">
import Button from "~/components/Button.vue";
import SvgIcon from "~/components/SvgIcon.vue";

// Composable
import { useBookmark } from "~/composables/bookmark";

// Helper
import { getUserId, getProfileId } from "~/helpers/authentication"

// GraphQL
import {
    useGetMovieBookmarksQuery
} from '~/graphql/types';

// Types
import type { movie } from "~/types/movie"

// Icon
import BookmarkIcon from "~/assets/icons/bookmark-love-1.svg";

interface Props {
    backdropPath: string
    genre: string
    movie: movie
}

const props = defineProps<Props>()

const emit = defineEmits<{
    (e: "bookmarkRemoved", movie: movie): void
    (e: "toggle"): void
}>()


const {
    isBookmarked,
    loading: isBookmarkLoading,
    toggle: toggleBookmark,
    onToggle: onToggleBookmark
} = useBookmark(props.movie.id.toString())

onToggleBookmark(() => {
    refetchBookmarkedMovie({
        profileId: profileId.value,
        userId: userId.value
    })
})

const imgUrl = ref('https://image.tmdb.org/t/p/original')

const userId = computed(() => getUserId())
const profileId = computed(() => getProfileId())
/**
 * Stored hovered movie id
 */
const onHoverMovie = ref<{
    genre: string;
    movieId: string;
}>({
    genre: "",
    movieId: ""
})

function handleOnHover(genre: string, movieId: string) {
    onHoverMovie.value = {
        genre,
        movieId
    }
}

function handleOnLeave() {
    onHoverMovie.value = {
        genre: "",
        movieId: ""
    }
}

const {
    result: bookmarkedMovieResult,
    loading: isBookmarkMovieLoading,
    refetch: refetchBookmarkedMovie
} = useGetMovieBookmarksQuery({
    profileId: profileId.value,
    userId: userId.value
})

watch(bookmarkedMovieResult, () => {
    if(bookmarkedMovieResult.value) {
        const bookmarkedMovie = bookmarkedMovieResult.value.bookmarks.find((movie) => movie.movieId === props.movie.id.toString())

        isBookmarked.value = !!bookmarkedMovie
    }
})
</script>

<template>
    <div class="flex flex-col justify-center w-full overflow-hidden text-center">
        <div class="relative w-full h-full rounded-lg overflow-hidden cursor-pointer"
            @mouseover="handleOnHover(genre, movie.id as string)" @mouseleave="handleOnLeave()">
            <div class="absolute top-2 right-2 z-20">
                <Button variant="template" @click="toggleBookmark" preventDefault>
                    <SvgIcon :src="BookmarkIcon" :height="20" :width="20" class="stroke-2"
                        :class="[isBookmarked ? 'fill-red-600 stroke-red-600' : 'fill-none stroke-white']"/>
                </Button>
            </div>
            <div v-if="onHoverMovie && onHoverMovie.movieId === movie.id && onHoverMovie.genre === genre"
                @click="emit('toggle')"
                class="absolute inset-0 flex justify-center items-center bg-black/40">
                <a class="text-xs hover:underline">Show Details</a>
            </div>
            <img :src="imgUrl + backdropPath" alt="" class="h-full object-cover object-center mx-auto " />
        </div>
        <p class="text-xs desktop:text-base truncate">{{ movie.title }}</p>
    </div>
</template>
