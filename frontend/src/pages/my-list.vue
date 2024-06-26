<script setup lang="ts">
import ProfileHeader from "~/components/header/ProfileHeader.vue";
import ProfileFooter from "~/components/footer/ProfileFooter.vue";
import MovieCard from "~/components/MovieCard.vue";
import MovieDialog from "~/components/MovieDialog.vue";

// Composable
import { useAuthStore } from "~/pinia/auth";

// Helper
import { getMovieDetail } from "~/helpers/movie";

// GraphQL
import {
    useGetMovieBookmarksQuery
} from '~/graphql/types';

// Types
import type { movie } from "~/types/movie"

const auth = useAuthStore()
const userId = computed(() => auth.data.userId)
const profileId = computed(() => auth.profile.id)

const bookmarkedMovies = ref<movie[]>([])

const {
    result: bookmarkedMovieResult,
    loading: isBookmarkMovieLoading,
} = useGetMovieBookmarksQuery({
    profileId: profileId.value,
    userId: userId.value
}, {
    fetchPolicy: 'network-only'
})

watchEffect(() => {
    if(bookmarkedMovieResult.value) {
        bookmarkedMovies.value = []
        bookmarkedMovieResult.value.bookmarks.forEach(async (result) => {
            const movie = await getMovieDetail(result.movieId)
            bookmarkedMovies.value.push(movie)
        })
    }
})

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

watch(movieIdToShow, async () => {
    if(movieIdToShow.value) {
        movieToShow.value = await getMovieDetail(movieIdToShow.value)
    }
})

</script>

<template>
    <div class="relative bg-[#141414]">
        <ProfileHeader class="z-20" />

        <div class="bg-[#141414] text-white min-h-[1000px] border-box pb-12">
            <div ref="sub-header" class="flex flex-col flex-grow">
                <div
                    class="absolute inset-x-0 flex items-center mt-10 laptop:mt-16 h-[68px] px-[4%] desktop:px-[3.75rem] text-lg laptop:text-2xl">
                    <div class="w-fit">My List</div>
                </div>
            </div>

            <div class="absolute top-[8%] laptop:top-[12%] self-stretch min-h-[1/2] w-full px-4 laptop:px-16">
                <div class="grid grid-cols-2 tablet-sm:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-2 pb-8">
                    <template v-for="movie in bookmarkedMovies">
                        <MovieCard :movie="movie" :backdrop-path="movie.image" @toggle="toggleMovieDialog(movie.id)" />
                    </template>
                </div>
            </div>
        </div>

        <ProfileFooter class="mt-8" />

        <!-- Movie dialog -->
        <template v-if="movieToShow">
            <MovieDialog :movie-to-show="movieToShow" :open="isMovieDialogShown" @close="toggleMovieDialog" />
        </template>
    </div>
</template>
