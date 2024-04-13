import { defineStore } from "pinia";
import type { Writeable } from "~/types/general";

// Types
import type { USER_CREDENTIALS } from "~/types/authentication";

export const useSignUpStore = defineStore("sign-up-user", () => {
    const initialState = undefined;
    const emptyState = {
        email: "",
        password: "",
        phoneNumber: "",
    };
    const user = ref<Writeable<USER_CREDENTIALS> | undefined>(initialState);
    function reset() {
        user.value = initialState;
    }

    return { emptyState, user, reset };
});
