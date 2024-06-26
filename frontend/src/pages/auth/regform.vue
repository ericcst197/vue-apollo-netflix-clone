<script setup lang="ts">
import Button from '~/components/Button.vue';
import BaseInput from '~/components/BaseInput.vue'

// Helpers
import { validateEmail, validatePassword } from "~/helpers/validators";

// Composables
import { useAuth } from "~/composables/authentication";
import { useSignUpStore } from "~/pinia/user";

// Types
import type { USER_CREDENTIALS } from "~/types/authentication";

// Composable Instances
const router = useRouter();
const auth = useAuth();
const signUpStore = useSignUpStore();

/**
 * Input Validity
 */
const validity = computed(() => {
    return {
        email: {
            isValid: validateEmail(email.value || ""),
            errorMessage: "Please enter a valid email address."
        },
        get password() {
            let isValid = false
            let message = ''
            if (password.value.length < 8) {
                isValid = false;
                message = "Must be at least 8 characters"
            } else {
                isValid = validatePassword(password.value)
                if (!isValid) {
                    message = "Must have at least one number, one uppercase letter and one lowercase letter"
                } else {
                    // TODO: Check for strength
                }
            }
            return {
                isValid,
                errorMessage: message
            }
        }
    }
});

// Input states
const trySignUp = ref(false);
const email = ref<string>("");
const password = ref<string>("");

const emailBorderStyle = computed(() => {
    if (trySignUp.value && validity.value.email.isValid) {
        return 'border border-green-500 rounded-lg'
    } else if ((trySignUp.value && !validity.value.email.isValid) || (trySignUp.value && email.value == '')) {
        return 'border border-orange-500 rounded-t-lg'
    } else return 'border border-zinc-500 rounded-lg'
});

const passwordBorderStyle = computed(() => {
    if (trySignUp.value && validity.value.password.isValid) {
        return 'border border-green-500 rounded-lg'
    } else if ((trySignUp.value && !validity.value.password.isValid) || (trySignUp.value && password.value == '')) {
        return 'border border-orange-500 rounded-t-lg'
    } else return 'border border-zinc-500 rounded-lg'
});

async function signUp() {
    trySignUp.value = true

    // Check if inputs are valid before sign up process
    if(!validity.value.email.isValid || !validity.value.password.isValid) return

    signUpStore.user = {
        ...signUpStore.user,
        email: email.value,
        password: password.value,
    } as USER_CREDENTIALS;

    if (signUpStore.user && signUpStore.user.email && signUpStore.user.password) {
        await auth.signUp({
            password: signUpStore.user.password,
            email: signUpStore.user.email
        } as USER_CREDENTIALS,
        async () => {
            await router.push('/simpleSetup/newProfiles')
        })

    }
};

onMounted(() => {
    if (signUpStore.user && signUpStore.user.email) {
        email.value = signUpStore.user.email
    }
});
</script>

<template>
    <div class="max-w-[978px] mx-auto pt-5 pb-14 px-8">
        <form>
            <div class="max-w-[440px] mx-auto mt-6 mb-5 text-start">
                <!-- <span class="text-sm tracking-wider">STEP <b>1</b> of <b>3</b></span> -->
                <h1 class="text-display-sm font-medium mb-[0.4em] leading-tight">Create a password to sign in your account
                </h1>
                <p class="text-[18px] leading-tight mb-4">Just add a password and you're done!
                    We hate paperwork, too.</p>
                <BaseInput id="signup-email" label="Email Address" type="email" v-model="email" class="w-full mb-2.5"
                    :helperText="trySignUp && validity.email.isValid && email !== '' ? '' : validity.email.errorMessage"
                    :hasClicked="trySignUp" :warn="trySignUp && !validity.email.isValid" theme="light" required
                    :borderStyle="emailBorderStyle" />
                <BaseInput id="signup-password" label="Add a password" v-model="password" class="w-full"
                    :helperText="validity.password.isValid && password !== '' ? '' : validity.password.errorMessage"
                    :hasClicked="trySignUp" :warn="trySignUp && !validity.password.isValid" theme="light" required
                    :borderStyle="passwordBorderStyle" />
                <Button mode="primary" class="w-full min-h-[64px] rounded mt-6" content-class="text-2xl font-normal"
                    @click="signUp">
                    Next</Button>
            </div>
        </form>
    </div>
</template>
