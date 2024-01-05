import { useStorage } from "@vueuse/core";

export const LOGIN_KEY = "netflix-clone-login";
export const LOGIN_DEFAULT = {
    email: "",
    password: "",
};

export function useSavedLogin() {
    return useStorage(LOGIN_KEY, LOGIN_DEFAULT);
}
