import { useQueryLoading } from "@vue/apollo-composable";
import { useAuthStore } from "~/pinia/auth";

import {
    useGetMovieBookmarksQuery,
    useCreateMovieBookmarkMutation,
    useDeleteMovieBookmarkMutation
} from "~/graphql/types";

/**
 * Composable to bookmark/un-bookmark a movie for currently logged-in user
 * @param id ID of the movie to bookmark/un-bookmark
 * @returns Bookmark-related functions & states
 */
export function useBookmark(
    id: string,
) {
    const auth = useAuthStore()
    const userId = computed(() => auth.data.userId);
    const profileId = computed(() => auth.profile.id);

    const isBookmarked = ref<boolean>(false)
    const loading = useQueryLoading();

    const movieId = ref<string | undefined>( id || undefined );
    const bookmarkId = ref<string>();

    let onToggleCallback: (() => void) | undefined = undefined;
    let onCreateCallback: (() => void) | undefined = undefined;
    let onDeleteCallback: (() => void) | undefined = undefined;

    const {
        result: bookmarkedMovieResult,
    } = useGetMovieBookmarksQuery({
        movieId: id,
        profileId: profileId.value,
        userId: userId.value
    }, () => ({
        fetchPolicy: "network-only"
    }))

    watch(bookmarkedMovieResult, () => {
        const result = bookmarkedMovieResult.value;

        if(result && result.bookmarks.length > 0) {
            const bookmarkedMovie = result.bookmarks.find((movie) => movie.movieId === id.toString())

            isBookmarked.value = true
            bookmarkId.value = bookmarkedMovie?.id ?? undefined
            movieId.value = bookmarkedMovie?.movieId
        } else {
            isBookmarked.value = false
            bookmarkId.value = undefined
        }
    })

    const { mutate: createBookmark } = useCreateMovieBookmarkMutation({
        variables: undefined,
    });

    const { mutate: deleteBookmark } = useDeleteMovieBookmarkMutation({
        variables: undefined,
    });

    async function bookmark() {
        if(movieId.value && userId.value && profileId.value){
            console.log('Bookmarking movie...');
            await createBookmark({
                movieId: movieId.value,
                userId: userId.value,
                profileId: profileId.value
            });
            onCreateCallback && onCreateCallback();
            isBookmarked.value = true;
        }
    }

    async function unBookmark() {
        if (movieId.value && userId.value && profileId.value) {
            await deleteBookmark({
                movieId: movieId.value,
                userId: userId.value,
                profileId: profileId.value
            });
            onDeleteCallback && onDeleteCallback();
            isBookmarked.value = false;
        }
    }

    async function toggle() {
        try {
            if (!isBookmarked.value) {
                await bookmark();
            } else {
                await unBookmark();
            }

            onToggleCallback && onToggleCallback();
        } catch (error: any) {
            console.error(error);
        }
    }

    function onToggle(callback: () => void) {
        onToggleCallback = callback;
    }

    function onBookmarkCreated(callback: () => void) {
        onCreateCallback = callback;
    }

    function onBookmarkDeleted(callback: () => void) {
        onDeleteCallback = callback;
    }

    return {
        isBookmarked,
        bookmark,
        unBookmark,
        toggle,
        onToggle,
        loading,
        onBookmarkCreated,
        onBookmarkDeleted,
    };
}
