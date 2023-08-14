<script setup lang="ts">
import BaseInput  from '~/components/BaseInput.vue'
import Button from '~/components/Button.vue';

// Helpers
import { validateEmail } from '~/helpers/validators'

// Input states
const email = ref<string>("")
const password = ref<string>("")

const validity = computed(() => {
    return {
        email: {
            isValid: validateEmail(email.value || ""),
            errorMessage: "Please enter a valid email"
        },
        password: {
            isValid: password.value.length > 3 && password.value.length < 61,
            errorMessage: "Your password must contain between 4 and 60 characters."
        }
    }
})

/**
 * Return true when the BaseInput component has been clicked, otherwise return false
 */
const hasClicked = ref({
    email: false,
    password: false
})

</script>

<template>
    <form action="#">
        <BaseInput id="login-email" label="Email" type="email" v-model="email" @focusout="hasClicked.email = true"
            :helperText="hasClicked.email && validity.email.isValid || email !== '' ? '' : validity.email.errorMessage"
            :warn="hasClicked.email && !validity.email.isValid" theme="dark" :hasClicked="hasClicked.email"
            class="pb-4"/>
        <BaseInput id="login-password" label="Password" type="password" v-model="password" @focusout="hasClicked.password = true"
            :helperText="hasClicked.password && validity.password.isValid || password !== ''  ? '' : validity.password.errorMessage"
            :warn="hasClicked.password && !validity.password.isValid" theme="dark" :hasClicked="hasClicked.password"/>
        <Button mode="primary" class="w-full max-w-full p-3 mt-6 mb-3 rounded"
            content-class="text-lg">
            Sign In
        </Button>
        <div class="flex flex-row text-xs text-[#b3b3b3]">
            <div class="flex-1">
                <input type="checkbox" name="remember-me" id="rememberMe">
                <label for="rememberMe" class="ml-2">Remember Me</label>
            </div>
            <p>Need help?</p>
        </div>
    </form>
</template>

