// Helpers
import * as auth from "~/helpers/authentication";
import { useStorage } from "@vueuse/core";

// Composables
import { useSignUpStore } from "~/pinia/user";
import { useAuthStore } from "~/pinia/auth";

// Types
import type { USER_CREDENTIALS, TokenType } from "~/types/authentication";

// COMPOSABLE INSTANCES
const userAuth = useAuthStore();
const signUpStore = useSignUpStore();

export function useAuth() {
    async function signUp(
        { email, password }: USER_CREDENTIALS,
        successCallback?: (response: any) => void,
        errorCallback?: (error: any) => void
    ) {
        userAuth.data.isLoading = true;
        await auth.signUp(email, password)
            .then(async () => {
                login(
                    signUpStore.user!.email,
                    signUpStore.user!.password!,
                    (response) => {
                        successCallback && successCallback(response)
                    }
                )
            })
            .catch((error: any) => {
                console.error(error, "Error")
                errorCallback && errorCallback(error);
            })
            .finally(() => {
                userAuth.data.isLoading = false;
            });
    }

    async function login(
        email: string,
        password: string,
        successCallback?: (response: any) => void,
        errorCallback?: (error: any) => void
    ) {
        userAuth.data.isLoading = true;
        await auth.login(email, password)
            .then((response) => {
                userAuth.data = {
                    isLoading: false,
                    token: response?.data?.loginUser.token!,
                    expiresIn: response?.data?.loginUser.expiresIn!,
                    expirationDate: auth.calculateExpirationTime(
                        response?.data?.loginUser.expiresIn!
                    ),
                    tokenType: (response?.data?.loginUser.tokenType || "Bearer") as TokenType,
                };

                // Implement token storage
                useStorage("netflix-clone-auth", {
                    userAuth: userAuth.data
                });
                successCallback && successCallback(response);
            })
            .catch((error) => {
                console.error(error)
                errorCallback && errorCallback(error);
            })
            .finally(() => {
                userAuth.data.isLoading = false;
            });
    }

    return {
        signUp,
        login
    }
}
