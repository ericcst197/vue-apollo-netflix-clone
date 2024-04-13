<script setup lang="ts">
import BaseInput from "~/components/BaseInput.vue";
import BasePage from "~/layouts/BasePage.vue";
import Button from '~/components/Button.vue';
import LogoMark from "~/components/LogoMark.vue";
import SignUpFooter from "~/components/footer/SignUpFooter.vue";
import SvgIcon from "~/components/SvgIcon.vue"

// Composables
import { useSignUpStore } from "~/pinia/user";
import { useAuthStore } from "~/pinia/auth";
import { useAuth } from "~/composables/authentication";

// Icons
import UserAddIcon from "~/assets/icons/user-plus-01.svg"
import UserIcon from "~/assets/icons/user-01.svg"

// GraphQL
import {
    useCreateProfilesMutation,
    type ProfileInput,
} from "~/graphql/types"
import router from "~/router";

// COMPOSABLE INSTANCES
const userAuth = useAuthStore();
const signUpStore = useSignUpStore();
const auth = useAuth()

// STATES: CORE

const userId = computed(() => userAuth.data.userId || "6617a4853d453ff01d7a2711")

const profileNames = ref<string[]>(Array.from({ length: 5 }).fill("") as string[])

const allProfileNames = computed(() => {
    return profileNames.value.filter(name => name !== "")
})

const {
    mutate: createProfiles
} = useCreateProfilesMutation({
    variables: undefined
})

async function submit() {
    try {
        await auth.login(
            signUpStore.user!.email,
            signUpStore.user!.password!,
            async () => {
                 // Create profiles
                if(userId.value) {
                    const input = allProfileNames.value.map(name => {
                        return {
                            name,
                            userId: userId.value,
                            image: null
                        } as ProfileInput
                    })

                    await createProfiles({ input: input })
                    await router.push('/browse')
                } else throw Error("User ID not found")
            }
        )
    } catch (error) {
        console.error(error)
        alert("Something went wrong. Please try again later.")
    }
}
</script>

<template>
    <BasePage class="laptop:w-4/5 laptop:mx-auto">
        <nav class="w-full flex flex-row items-center justify-between border-b border-b-[#e6e6e6]">
            <LogoMark id="logo" logo-class="w-20 tablet-sm:w-[166px] h-12"
                class="flex-grow desktop:flex-grow-0 ml-[3%] tablet-sm:h-[90px]" />
            <router-link to="" class="text-md font-medium tablet:text-xl hover:underline mx-[3%]">Help</router-link>
        </nav>
        <div class="flex flex-col laptop:flex-row flex-1 px-16 laptop:px-0 py-4 pb-10">
            <div class="laptop:w-2/5">
                <h1 class="text-display-sm font-bold leading-normal mb-3">Who will be
                    <br class="hidden laptop:block">watching Netflix?
                </h1>
                <p class="text-sm mb-2">Add a profile for up to 5 people you live with to get:</p>
                <ul class="text-sm list-disc pl-8">
                    <li>Personalized recommendations</li>
                    <li>Different settings for whoever is watching</li>
                    <li>An experience tailored to each individual</li>
                </ul>
            </div>
            <div class="flex flex-col gap-y-12 laptop:w-3/5 py-6 px-4">
                <div class="flex flex-col gap-y-2">
                    <h5 class="text-sm font-semibold tracking-wide">Your profile</h5>
                    <div class="flex flex-row items-center">
                        <SvgIcon :src="UserIcon" class="stroke-2 stroke-gray-900" :height="24" :width="24" />
                        <BaseInput id="login-name-1" label="Name" v-model="profileNames[0]" theme="light" class="ml-4"
                            :border-style="'text-gray-500 border border-zinc-500'" />
                    </div>
                </div>
                <div class="flex flex-col gap-y-2">
                    <h5 class="text-sm font-semibold tracking-wide">Add profiles?</h5>
                    <template v-for="(profileName, index) in profileNames.slice(1)" :key="index">
                        <div class="flex flex-row items-center">
                            <SvgIcon :src="UserAddIcon" class="stroke-2 stroke-gray-900" :height="24" :width="24" />
                            <BaseInput id="login-name-2" label="Name" v-model="profileNames[index + 1]" theme="light" class="ml-4"
                                :border-style="'text-gray-500 border border-zinc-500'" />
                        </div>
                    </template>
                    <div class="mt-5 laptop:ml-10 p-5 bg-[#e7e7e7]">
                        Only people who live with you may use your account. <b>Learn more</b>.
                    </div>
                    <Button mode="primary" class="self-end w-1/2 laptop:w-1/4 p-4 mt-6 mb-3 rounded-sm"
                        content-class="text-lg" :disabled="allProfileNames.length < 1"
                        @click="submit">Next</Button>
                </div>
            </div>
        </div>
        <SignUpFooter />
    </BasePage>
</template>
