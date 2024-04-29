<script setup lang="ts">
interface Props {
    title: string,
    value: any,
}

const { title, value } = defineProps<Props>()
</script>

<template>
    <div>
        <span class="text-[#777] mr-2 text-sm">{{ title }}:</span>
        <span class="text-white text-sm">{{ value }}</span>
    </div>
</template>
