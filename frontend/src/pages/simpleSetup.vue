<script setup lang="ts">
import BaseInput from "~/components/BaseInput.vue";
import BasePage from "~/layouts/BasePage.vue";
import Button from '~/components/Button.vue';
import LogoMark from "~/components/LogoMark.vue";
import SignUpFooter from "~/components/footer/SignUpFooter.vue";
import SvgIcon from "~/components/SvgIcon.vue"

import UserAddIcon from "~/assets/icons/user-plus-01.svg"
import UserIcon from "~/assets/icons/user-01.svg"

const profileName1 = ref<string>("")
const profileName2 = ref<string>("")
const profileName3 = ref<string>("")
const profileName4 = ref<string>("")
const profileName5 = ref<string>("")

const allProfileNames = computed(() => {
    return [profileName1.value, profileName2.value, profileName3.value, profileName4.value, profileName5.value].filter(name => name !== "")
})

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
                        <BaseInput id="login-email" label="Name" v-model="profileName1" theme="light" class="ml-4"
                            :border-style="'text-gray-500 border border-zinc-500'" />
                    </div>
                </div>
                <div class="flex flex-col gap-y-2">
                    <h5 class="text-sm font-semibold tracking-wide">Add profiles?</h5>
                    <div class="flex flex-row items-center">
                        <SvgIcon :src="UserAddIcon" class="stroke-2 stroke-gray-900" :height="24" :width="24" />
                        <BaseInput id="login-email" label="Name" v-model="profileName2" theme="light" class="ml-4"
                            :border-style="'text-gray-500 border border-zinc-500'" />
                    </div>
                    <div class="flex flex-row items-center">
                        <SvgIcon :src="UserAddIcon" class="stroke-2 stroke-gray-900" :height="24" :width="24" />
                        <BaseInput id="login-email" label="Name" v-model="profileName3" theme="light" class="ml-4"
                            :border-style="'text-gray-500 border border-zinc-500'" />
                    </div>
                    <div class="flex flex-row items-center">
                        <SvgIcon :src="UserAddIcon" class="stroke-2 stroke-gray-900" :height="24" :width="24" />
                        <BaseInput id="login-email" label="Name" v-model="profileName4" theme="light" class="ml-4"
                            :border-style="'text-gray-500 border border-zinc-500'" />
                    </div>
                    <div class="flex flex-row items-center">
                        <SvgIcon :src="UserAddIcon" class="stroke-2 stroke-gray-900" :height="24" :width="24" />
                        <BaseInput id="login-email" label="Name" v-model="profileName5" theme="light" class="ml-4"
                            :border-style="'text-gray-500 border border-zinc-500'" />
                    </div>
                    <div class="mt-5 laptop:ml-10 p-5 bg-[#e7e7e7]">
                        Only people who live with you may use your account. <b>Learn more</b>.
                    </div>
                    <Button mode="primary" class="self-end w-1/2 laptop:w-1/4 p-4 mt-6 mb-3 rounded-sm"
                        content-class="text-lg">Next</Button>
                </div>
            </div>
        </div>
        <SignUpFooter />
    </BasePage>
</template>
