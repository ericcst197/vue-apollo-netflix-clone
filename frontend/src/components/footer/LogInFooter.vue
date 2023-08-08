<script setup lang="ts">
import netflix from '~/netflix';
import Divider from '~/components/Divider.vue';
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
    "FAQ", "Help Center", "Term of Use", "Privacy", "Cookie Reference", "Corporate Infomation"
])
/**
 * STATE CORE (END)
 */
</script>

<template>
    <div class="bg-opacity-75 mt-10">
        <footer class="h-full w-[90%] tablet:max-w-5xl mx-auto py-8 text-[#737373]">
            <Divider class="tablet:hidden"/>
            <p class="w-full mb-8">Questions? Call {{ netflix.INQUIRY_PHONE }}</p>
            <ul class="w-full inline-flex flex-row flex-wrap">
                <li v-for="link in footerLinks" class="mt-3 flex-[0_0_50%] tablet:flex-[0_0_33%] laptop:flex-[0_0_25%]">
                    <a href="#" class="text-sm opacity-7 underline">{{ link }}</a>
                </li>
            </ul>
            <div class="mt-9">
                <div class="relative flex flex-row items-center h-fit w-fit bg-transparent rounded border border-zinc-500">
                    <SvgIcon :src="NetworkIcon" class="absolute left-3 right-auto stroke-2 stroke-[#737373]" />
                    <select name="language" class="z-10 w-full font-[13px] pr-6 pl-12 tablet:px-10 py-3 outline-white rounded bg-transparent !text-[#737373]">
                        <option value="my-en">English</option>
                        <option value="my">Bahasa Melayu</option>
                    </select>
                    <SvgIcon :src="ChevronDown" :height="16" :width="16" class="absolute right-3 left-auto stroke-2 stroke-[#737373]" />
                </div>
            </div>
        </footer>
    </div>
</template>
