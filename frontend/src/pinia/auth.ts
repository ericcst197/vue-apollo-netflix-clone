import { defineStore } from "pinia";
import type { USER_AUTH_DATA } from "~/types/authentication";

export const useAuthStore = defineStore("auth", () => {
    const initialState: USER_AUTH_DATA = {
        isLoading: false,
        auth0Id: "",
        token: "",
        accessToken: "",
        refreshToken: "",
        expiresIn: 0,
        expirationDate: 0,
        tokenType: "Bearer",
    };
    const data = ref<USER_AUTH_DATA>(initialState);

    const isAuthenticated = computed(
        () =>
            data.value.token.length > 0 &&
            data.value.expirationDate > Date.now()
    );

    function reset() {
        data.value = initialState;
    }

    return { data, isAuthenticated, reset };
});
