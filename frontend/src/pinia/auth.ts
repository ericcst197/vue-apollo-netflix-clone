import { defineStore } from "pinia";
import type { USER_AUTH_DATA, USER_PROFILE } from "~/types/authentication";

export const useAuthStore = defineStore("auth", () => {
    const initialState: USER_AUTH_DATA = {
        isLoading: false,
        isFirstLogin: true,
        userId: "",
        token: "",
        accessToken: "",
        refreshToken: "",
        expiresIn: 0,
        expirationDate: 0,
        tokenType: "Bearer",
    };

    const profileState: USER_PROFILE = {
        id: "",
        image: "",
        name: "",
        userId: ""
    };

    const data = ref<USER_AUTH_DATA>(initialState);
    const profile = ref<USER_PROFILE>(profileState);

    const storedUser = localStorage.getItem('netflix-clone-auth')
    const storedProfile = sessionStorage.getItem('profile')

    if(storedUser) {
        data.value = {
            ...data.value,
            ...JSON.parse(storedUser)
        }
    }

    if(storedProfile) {
        profile.value = {
            ...profile.value,
            ...JSON.parse(storedProfile)
        }
    }

    const isAuthenticated = computed(
        () =>
            data.value.token.length > 0 &&
            data.value.expirationDate > Date.now()
    );

    function reset() {
        data.value = initialState;
        profile.value = profileState;
    }

    return { data, profile, isAuthenticated, reset };
});
