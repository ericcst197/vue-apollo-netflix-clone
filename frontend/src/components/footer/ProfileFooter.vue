<script setup lang="ts">
import SvgIcon from "~/components/SvgIcon.vue"

// Icons
import FacebookIcon from "~/assets/icons/facebook-icon.svg"
import InstaIcon from "~/assets/icons/insta-icon.svg"
import TwitterIcon from "~/assets/icons/twitter-icon.svg"
import YoutubeIcon from "~/assets/icons/youtube-icon.svg"

/**
 * STATE CORE (START)
 */
/**
 * Links for the homepage footer section
 */
 const footerLinks = ref<string[]>([
    "Audio Description", "Help Center", "Gift Cards", "Media Center", "Investor Relations", "Jobs", "Terms of Use",
    "Privacy", "Legal Notices", "Cookie Preferences", "Corporate Infomation", "Contact Us"
])
/**
 * STATE CORE (END)
 */
</script>

<template>
    <div class="max-w-screen-lg mt-6 mx-auto w-full box-border text-[#808080] tracking-normal text-[13px]">
        <footer
            class="inline-flex flex-col px-[4%] ">
            <div class="flex gap-x-6 mb-[1em]">
                <SvgIcon class="cursor-pointer" :src="FacebookIcon" :height="28" :width="32" />
                <SvgIcon class="stroke-2 cursor-pointer" :src="InstaIcon" :height="28" :width="32" />
                <SvgIcon class="cursor-pointer" :src="TwitterIcon" :height="28" :width="32" />
                <SvgIcon class="cursor-pointer" :src="YoutubeIcon" :height="28" :width="32" />
            </div>
            <div class="">
                <ul class="inline-flex flex-row flex-wrap">
                    <li v-for="link in footerLinks" class="mt-3 flex-[0_0_100%] tablet:flex-[0_0_50%] laptop:flex-[0_0_33%] desktop:flex-[0_0_25%]">
                        <a href="#" class="opacity-7 hover:underline">{{ link }}</a>
                    </li>
                </ul>
            </div>
            <p class="mt-9 mb-4">
                Netflix Clone @ 2023-2024 - built by
                <a href="https://github.com/ericcst197" target="_blank" class="hover:underline">Eric Choo</a>
            </p>
        </footer>
    </div>
</template>
