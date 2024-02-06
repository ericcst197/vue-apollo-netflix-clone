<script setup lang="ts">
import BaseInput from '~/components/BaseInput.vue'
import Button from '~/components/Button.vue';

// Composables
import { useAuth } from "~/composables/authentication";
import { useSavedLogin } from "~/composables/storage";

// Helpers
import { validateEmail, validatePassword } from "~/helpers/validators";


// GraphQLs
import { useGetUserRoleAsAnonymousLazyQuery } from '~/graphql/types';

// Composable Instances
const router = useRouter();
const savedLogin = useSavedLogin();
const auth = useAuth();

/**
 * Login credential inputs
 */
const credentials = ref({
    email: savedLogin.value.email,
    password: savedLogin.value.password,
    isRememberEnabled: savedLogin.value.email !== '' || savedLogin.value.password !== '',
})

const isLoginAllowed = computed(() => inputValidity.value.isAllValid)
const loginError = ref<"email_error" | "password_error">()

/**
 * Validate inputs
 */
const inputValidity = computed<{
    email: {
        isValid: boolean
        isWarn: boolean
        message: string
    }
    password: {
        isValid: boolean
        isWarn: boolean
        message: string
    }
    isAllValid: boolean
}>(() => {
    const emailValidation = validateEmail(credentials.value.email)
    const passwordValidation = validatePassword(credentials.value.password)

    return {
        email: {
            isValid: emailValidation,
            isWarn: credentials.value.email.length > 0,
            get message() {
                if (credentials.value.email.length === 0 && !emailValidation) {
                    return "Email can't be empty"
                } else if (credentials.value.email.length > 0 && !emailValidation) {
                    return "Your email format is incorrect"
                }
                return ""
            }
        },
        password: {
            isValid: passwordValidation,
            isWarn: credentials.value.password.length > 0,
            get message() {
                if (credentials.value.password.length === 0 && !passwordValidation) {
                    return "Password can't be empty"
                } else if (credentials.value.password.length > 0 && !passwordValidation) {
                    return "Must have at least one number, one uppercase letter and one lowercase letter"
                }
                return ""
            }
        },
        isAllValid: emailValidation && passwordValidation
    }
})

/**
 * Return true when the BaseInput component has been clicked, otherwise return false
 */
const showValidity = ref<{
    [key: string]: boolean
}>({
    email: false,
    password: false
});

const isFirstLoad = ref(true)
/*
FEATURE : ACCESS CONTROL (START)
*/

function logIn() {
    Object.keys(showValidity.value).forEach(key => showValidity.value[key] = true)
    if (isLoginAllowed.value) {
        if (isFirstLoad.value) {
            getUsers(undefined, {
                email: credentials.value.email
            })
            isFirstLoad.value = false
        } else {
            refetchUsers({
                email: credentials.value.email
            })
        }
    }
}

/* GQL : Get users */
const {
    load: getUsers,
    onResult: onGetUsersResult,
    onError: onGetUsersError,
    loading: isGetUsersLoading,
    refetch: refetchUsers
} = useGetUserRoleAsAnonymousLazyQuery({
    email: credentials.value.email
}, {
    fetchPolicy: 'network-only'
})

onGetUsersResult(async (param) => {
    if (param.data.users.length > 0) {
        await auth.login(
            credentials.value.email,
            credentials.value.password,
            () => {
                if (credentials.value.isRememberEnabled) {
                    // Save
                    savedLogin.value = {
                        email: credentials.value.email,
                        password: credentials.value.password
                    }
                }

                loginError.value = undefined
                router.push('/simpleSetup/newProfiles')
            },
            (error) => {
                // Safely check for the path
                if (error.message.includes("incorrect password")) {
                    loginError.value = "password_error"
                    credentials.value.password = ""
                }
            }
        )
    } else {
        loginError.value = "email_error"
    }
})
</script>

<template>
    <form action="#">
        <div v-if="loginError" class="bg-[#e87c03] py-2.5 px-5 text-sm rounded-lg mb-4">
            <span v-if="loginError === 'password_error'">
                <b>Incorrect password.</b> Please try again or you can reset your password.</span>
            <span v-else> Sorry, we can't find an account with this email address. Please try
                again or create a new account.</span>
        </div>
        <BaseInput id="login-email" label="Email" type="email" v-model="credentials.email"
            :helperText="inputValidity.email.isValid && credentials.email !== '' ? '' : inputValidity.email.message"
            :warn="showValidity.email && !inputValidity.email.isValid" theme="dark" class="pb-4"
            @focusout="showValidity.email = true" />
        <BaseInput id="login-password" label="Password" type="password" v-model="credentials.password"
            :helperText="inputValidity.password.isValid && credentials.password !== '' ? '' : inputValidity.password.message"
            :warn="showValidity.password && !inputValidity.password.isValid" theme="dark"
            @focusout="showValidity.password = true" />
        <Button @click="logIn" mode="primary" class="w-full max-w-full p-3 mt-6 mb-3 rounded" content-class="text-lg">
            Sign In
        </Button>
        <div class="flex flex-row text-xs text-[#b3b3b3]">
            <div class="flex-1">
                <input v-model="credentials.isRememberEnabled" type="checkbox" name="remember-me" id="rememberMe">
                <label for="rememberMe" class="ml-2">Remember Me</label>
            </div>
            <p>Need help?</p>
        </div>
    </form>
</template>

