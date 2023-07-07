<script setup lang="ts">
import netflix from '~/netflix';
</script>

<template>
    <div class="flex flex-row items-center">
        <router-link to="/">
            <img :src="netflix.COMPANY_LOGO" class="w-[90px] h-6 laptop:w-36 laptop:h-14" />
        </router-link>
    </div>
</template>
