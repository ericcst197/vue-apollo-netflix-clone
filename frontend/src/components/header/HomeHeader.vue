<script setup lang="ts">
import Button from '~/components/Button.vue';
import LogoMark from '~/components/LogoMark.vue';
import SvgIcon from '~/components/SvgIcon.vue';

// Icon
import NetworkIcon from "~/assets/icons/network-icon.svg"
import ChevronDown from "~/assets/icons/chevron-down.svg"

interface Props {
    navlinks?: boolean
    auth?: boolean
    sticky?: boolean
    border?: boolean
}

const { navlinks = false, auth = false, sticky = false, border = false } = defineProps<Props>()

// Composable Instances
const router = useRouter()


</script>

<template>
    <nav ref="navbarRef" class="h-20 desktop:h-[86px] tablet:px-6 desktop:px-12 flex items-center"
        :class="[{ 'border-b border-gray-200': border }, { 'sticky z-50 top-0 inset-x-0': sticky }]">
        <div class="w-full tablet:px-8 desktop:px-12 max-w-screen-2xl mx-auto flex flex-row items-center justify-between">
            <LogoMark id="logo" logo-class="w-[90px] h-8" class="flex-grow desktop:flex-grow-0" />

            <div class="flex flex-row p-[3px] items-center">
                <div class="relative flex flex-row items-center h-8 w-auto bg-zinc-900 rounded border border-zinc-500">
                    <SvgIcon :src="NetworkIcon" class="absolute left-3 right-auto stroke-2 stroke-white" />
                    <select name="language" class="z-10 w-0 tablet:w-full font-normal px-8 tablet:px-10 py-1 outline-white rounded bg-transparent text-white">
                        <option value="my-en">English</option>
                        <option value="my">Bahasa Melayu</option>
                    </select>
                    <SvgIcon :src="ChevronDown" :height="16" :width="16" class="absolute right-3 left-auto stroke-2 stroke-white" />
                </div>

                <Button @click="router.push('/login')" mode="primary" class="w-[4.5rem] h-8 text-sm font-medium ml-3">Sign In</Button>
            </div>
        </div>
    </nav>
</template>

