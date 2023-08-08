<script setup lang="ts">
import netflix from '~/netflix';
import SvgIcon from '~/components/SvgIcon.vue'

// Icons
import NetworkIcon from "~/assets/icons/network-icon.svg"
import ChevronDown from "~/assets/icons/chevron-down.svg"

/**
 * STATE CORE (START)
 */
/**
 * Links for the homepage footer section
 */
 const footerLinks = ref<string[]>([
    "FAQ", "Help Center", "Account", "Media Center", "Investor Relations", "Jobs", "Redeem Gift Cards",
    "Buy Gift Cards", "Ways to Watch", "Term of Use", "Privacy", "Cookie Reference", "Corporate Infomation",
    "Contact Us", "Speed Test", "Legal Notices", "Only on Netflix clone"
])
/**
 * STATE CORE (END)
 */
</script>

<template>
    <div class="max-w-screen-2xl mt-6 w-full box-border">
        <footer
            class="inline-flex flex-col pt-[3.75rem] desktop:pt-[5.875rem] px-x-mobile tablet:px-x-tablet desktop:px-x-desktop desktop-xl:px-x-desktop-xl pb-12 tablet:pb-16 desktop:pb-[6.25rem] desktop-xl:pb-[9.2rem]">
            <p class="">Questions? Call {{ netflix.INQUIRY_PHONE }}</p>
            <div class="mt-9">
                <ul class="inline-flex flex-row flex-wrap">
                    <li v-for="link in footerLinks" class="mt-3 flex-[0_0_100%] tablet:flex-[0_0_50%] laptop:flex-[0_0_33%] desktop:flex-[0_0_25%]">
                        <a href="#" class="opacity-7 underline">{{ link }}</a>
                    </li>
                </ul>
            </div>
            <div class="mt-9">
                <div class="relative flex flex-row items-center h-8 w-fit bg-zinc-900 rounded border border-zinc-500">
                    <SvgIcon :src="NetworkIcon" class="absolute left-3 right-auto stroke-2 stroke-white" />
                    <select name="language" class="z-10 w-0 tablet:w-full font-normal px-8 tablet:px-10 py-1 outline-white rounded bg-transparent text-white">
                        <option value="my-en">English</option>
                        <option value="my">Bahasa Melayu</option>
                    </select>
                    <SvgIcon :src="ChevronDown" :height="16" :width="16" class="absolute right-3 left-auto stroke-2 stroke-white" />
                </div>
            </div>
            <p class="mt-9">
                Netflix Clone @ 2023 - built by
                <a href="https://github.com/ericcst197" target="_blank" class="hover:underline">Eric Choo</a>
            </p>
        </footer>
    </div>
</template>
