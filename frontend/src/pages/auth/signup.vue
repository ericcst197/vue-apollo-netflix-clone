<script setup lang="ts">
import BasePage from '~/layouts/BasePage.vue';
import LogoMark from '~/components/LogoMark.vue';
import SignUpFooter from '~/components/footer/SignUpFooter.vue';
</script>

<template>
    <BasePage>
        <nav class="w-full max-w-screen-2xl flex flex-row items-center justify-between border border-b-[#e6e6e6]">
            <LogoMark id="logo" logo-class="w-20 tablet-sm:w-[166px] h-12" class="flex-grow desktop:flex-grow-0 ml-[3%] tablet-sm:h-[90px]" />
            <router-link to="/login" class="text-md font-medium tablet:text-xl hover:underline mx-[3%]">Sign In</router-link>
        </nav>
        <router-view></router-view>
        <SignUpFooter />
    </BasePage>
</template>
