import { useQueryLoading } from "@vue/apollo-composable";

import { getUserId, getProfileId } from "~/helpers/authentication"

import {
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
    const isBookmarked = ref<boolean>(false)
    const userId = computed(() => getUserId());
    const profileId = computed(() => getProfileId());

    const loading = useQueryLoading();

    const movieId = ref<string | undefined>( id || undefined );
    let onToggleCallback: (() => void) | undefined = undefined;
    let onCreateCallback: (() => void) | undefined = undefined;
    let onDeleteCallback: (() => void) | undefined = undefined;

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
