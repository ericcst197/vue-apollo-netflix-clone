<script setup lang="ts">
import netflix from '~/netflix';

interface Props {
    logoClass?: string,
}

const { logoClass } = defineProps<Props>()
</script>

<template>
    <div class="flex flex-row items-center">
        <router-link to="/">
            <img :src="netflix.COMPANY_LOGO" class="laptop:w-36 laptop:h-14" :class="logoClass"/>
        </router-link>
    </div>
</template>
