<script setup lang="ts">
import SvgIcon from "~/components/SvgIcon.vue";
import BaseMenu from "~/components/BaseMenu.vue";
import { MenuItem } from '@headlessui/vue'

// Composable
import { useAuth } from "~/composables/authentication"
import { useBreakpoints } from "~/composables/breakpoints";

// Helpers
import { navlinks } from "~/router/config";

// Icons
import SearchIcon from "~/assets/icons/search-02.svg";
import NotificationIcon from "~/assets/icons/notification-02.svg";
import ArrowIcon from "~/assets/icons/triangle-down.svg";
import HelpCircleIcon from "~/assets/icons/help-circle-01.svg";
import UserIcon from "~/assets/icons/user-02.svg";
import EditIcon from "~/assets/icons/pencil-icon.svg"

//Types
import type { NavigationObject } from "~/types/navigation";

// Composables Instances
const router = useRouter()
const auth = useAuth()

const breakpoints = useBreakpoints();

const navLinks = ref<NavigationObject[]>(navlinks)

const onHoverProfile = ref(false)

// Ref for header
const profileHeader = ref()
const isSticky = ref(false)
const profileLogo = computed(() => {
    const storedProfile = sessionStorage.getItem('profile')

    if(storedProfile) {
        return JSON.parse(storedProfile).image
    }

    return 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png'
})

function navigateTo(link: NavigationObject) {
    router.push(link.path)
}

onMounted(() => {
    window.addEventListener('scroll', () => {
        if(!profileHeader.value) return

        isSticky.value = window.scrollY > profileHeader.value.getBoundingClientRect().height
    });
})
</script>

<template>
    <header ref="profileHeader" :class="[isSticky ? ' bg-black': 'bg-transparent delay-200 ease-out duration-500 bg-gradient-to-b from-black to-transparent']"
        class="fixed top-0 w-full h-10 laptop:h-16 laptop:py-4 px-[4%] desktop:px-[3.75rem] text-white text-xs md:text-base ease-in duration-200 z-10">
        <div class="flex flex-1 items-center h-full">
            <router-link to="/browse" class="">
                <svg viewBox="0 0 111 30" data-uia="netflix-logo" class="h-5 laptop:h-6 w-20 laptop:w-24 fill-red-600"
                    aria-hidden="true" focusable="false">
                    <g id="netflix-logo">
                        <path
                            d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
                            id="Fill-14"></path>
                    </g>
                </svg>
            </router-link>
            <nav v-if="breakpoints.greater('laptop')">
                <ul
                    class="flex justify-around cursor-pointer items-center laptop:text-[80%] desktop:text-sm font-medium desktop:ml-4">
                    <li v-for="link in navLinks" class="ml-4 desktop:ml-6">
                        <component :is="link.disabled ? 'span' : 'router-link'" :to="link.path"
                            class="text-[#e5e5e5] hover:text-[#b3b3b3]">{{
                            link.name
                        }}</component>
                    </li>
                </ul>
            </nav>
            <BaseMenu v-else item-container-class="-left-12">
                <div class="flex flex-row items-center ml-4">
                    <h4 class="text-[10px]">Browse</h4>
                    <SvgIcon :src="ArrowIcon" class=" stroke-white ml-0.5" :height="16" :width="16" />
                </div>
                <template #items>
                    <MenuItem v-for="link in navLinks" v-slot="{ active }">
                        <button :class="[
                            active ? 'bg-[#2c2c2c] ' : '',
                            'w-full bg-[#141414] px-2 py-2 text-[#b3b3b3] text-center text-sm',
                        ]" @click="navigateTo(link)" :disabled="link.disabled" >
                            {{ link.name }}
                        </button>
                    </MenuItem>
                </template>
            </BaseMenu>
        </div>
        <div class="absolute top-0 right-[4%] desktop:right-[3.75rem] h-full flex flex-row items-center flex-end ">
            <SvgIcon :src="SearchIcon" class="fill-white mr-4" :height="24" :width="24" />
            <p v-if="breakpoints.greater('desktop')" class="cursor-pointer mr-4">Kids</p>
            <SvgIcon :src="NotificationIcon" class="stroke-white stroke-2 mr-4" :height="28" :width="28" />
            <BaseMenu item-container-class="w-40" @mouseover="onHoverProfile = true" @mouseleave="onHoverProfile = false">
                <div class="bg-transparent p-0 flex flex-row items-center cursor-pointer laptop:mr-4">
                    <img class="w-8 h-8 rounded"
                        :src="profileLogo"
                        alt="Netflix Logo">
                    <SvgIcon v-if="breakpoints.greater('laptop')" :src="ArrowIcon" :height="16" :width="16"
                        class=" stroke-white ml-2.5 duration-300" :class="{'rotate-180': onHoverProfile}" />
                </div>
                <template #items>
                    <MenuItem v-slot="{ active }">
                        <button :class="[
                            active ? 'bg-[#2c2c2c] ' : '',
                            'w-full bg-[#141414] px-2 py-2 text-left text-sm',
                        ]" class="flex gap-x-2 px-2">
                            <SvgIcon :src="EditIcon" :height="20" :width="20" class="stroke-2 stroke-[#b3b3b3] fill-[#b3b3b3]" />
                            <span class="inline text-white">Manage Profiles</span>
                        </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                        <button :class="[
                            active ? 'bg-[#2c2c2c] ' : '',
                            'w-full bg-[#141414] px-2 py-2 text-left text-sm',
                        ]" class="flex gap-x-2 px-2">
                            <SvgIcon :src="UserIcon" :height="20" :width="20" class="stroke-1 stroke-[#b3b3b3] fill-[#b3b3b3]" />
                            <span class="inline text-white">Account</span>
                        </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                        <button :class="[
                            active ? 'bg-[#2c2c2c] ' : '',
                            'w-full bg-[#141414] px-2 py-2 text-left text-sm',
                        ]" class="flex gap-x-2 px-2">
                            <SvgIcon :src="HelpCircleIcon" :height="20" :width="20" class="stroke-2 stroke-[#b3b3b3] fill-[#b3b3b3]" />
                            <span class="inline text-white">Help Center</span>
                        </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                        <button :class="[
                            active ? 'bg-[#2c2c2c] ' : '',
                            'w-full bg-[#141414] px-2 py-3 text-white text-left text-sm border-t-2 border-solid border-white',
                        ]" class="text-center hover:underline">
                            Sign out
                        </button>
                    </MenuItem>
                </template>
            </BaseMenu>
        </div>
    </header>
</template>
