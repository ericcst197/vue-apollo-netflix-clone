<script setup lang="ts">
import SvgIcon from '~/components/SvgIcon.vue'
import BaseDisclosure from '~/components/disclosure/BaseDisclosure.vue'

import AddIcon from '~/assets/icons/add-icon-1.svg'

interface Props {
    title: string,
}

const { title } = defineProps<Props>()

</script>

<template>
    <BaseDisclosure class="bg-[#2d2d2d] text-white mb-2">
        <template #button="{open}">
            <span class="text-lg laptop:text-2xl">{{ title }}</span>
            <SvgIcon v-show="open" :height="36" :width="36" class="stroke-2 stroke-white" :class="{ 'rotate-45': open }" :src="AddIcon" />
            <SvgIcon v-show="!open" :height="36" :width="36" class="stroke-2 stroke-white" :src="AddIcon" />
        </template>
        <template #content>
            <slot></slot>
        </template>
    </BaseDisclosure>
</template>
