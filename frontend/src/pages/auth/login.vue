<script setup lang="ts">
import BasePage from '~/layouts/BasePage.vue';
import LogoMark from '~/components/LogoMark.vue';
import SignInForm from '~/components/auth/SignInForm.vue';
import LogInFooter from '~/components/footer/LogInFooter.vue';

// Composables
import { useBreakpoints } from '~/composables/breakpoints';

const breakpoints = useBreakpoints()

</script>

<template>
    <BasePage class="m-0 p-0 bg-black text-white">
        <div class="bg-cover top-0 left-0 w-full" :class="{'background':(breakpoints.width.value > 600)}">
            <LogoMark id="logo" logo-class="w-[166px] h-10" class="flex-grow desktop:flex-grow-0 ml-[3%] h-[4.8rem] tablet:h-24" />
            <div class="flex flex-col items-center px-[5%] pt-5 tablet:pt-0 pb-8 tablet:pb-12">
                <div class="relative w-full tablet:max-w-md min-h-[550px] tablet:min-h-[660px] tablet:pt-[60px] tablet:pb-10 tablet:px-[68px] bg-opacity-75">
                    <div class="">
                        <h1 class="text-3xl font-medium mb-7">Sign In</h1>
                        <SignInForm />
                    </div>
                    <div class="flex flex-col flex-1 text-xs">
                        <div class="flex flex-row mt-3 space-x-1">
                            <p class="text-[#b3b3b3]">New to Netflix?</p>
                            <router-link to="/">Sign up now</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <LogInFooter />
        </div>
    </BasePage>
</template>

<style scoped>
.background {
    background-image:
        linear-gradient(0deg, rgba(0, 8, 29, 0.7), rgba(0, 8, 29, 0.7)),
        url("~/assets/img/landing/netflix-background.jpg");
    background-repeat: no-repeat;
}
</style>
