<script setup lang="ts">
import Header from '~/components/Header.vue'
</script>
<!-- Hero section -->
<template>
    <div class="bg-[#00081d] text-white tracking-normal w-full h-full">
        <section class="relative background bg-cover min-h-[56.25rem] xl-desktop:min-h-[64.125rem] px-6 tablet:px-8 desktop:px-12 ">
            <Header />

            <div class="pb-[26.25rem]">
                <div class="mx-auto max-w-[1609px] px-4 tablet:px-0">
                    <div class="pt-[60px] desktop:pt-24 tablet:px-x-tablet desktop:px-x-desktop xl-desktop:px-x-xl-desktop">
                        <div class="tablet:w-4/5 my-4">
                        <h1 class="text-display-md laptop:text-display-lg desktop:text-display-xl xl-desktop:text-display-2xl font-bold laptop:font-black">
                                Unlimited movies, TV shows, and more</h1>

                            <p class="text-lg desktop:text-2xl xl-desktop:text-3xl font-medium mt-4">Watch anywhere. Cancel anytime.</p>
                        </div>

                        <div class="mt-8 tablet:mt-10 desktop:mt-12 border-4 border-transparent rounded-lg p-4 laptop:py-6 laptop:px-11 text-lg sign-up-box">
                            <form action="#">
                                <h3 class="text-start laptop:text-xl">Ready to watch? Enter your email to create or restart your membership.</h3>
                                <div class="flex flex-col tablet:flex-row tablet:items-center pt-4">
                                    <div class="flex flex-col flex-1 max-w-[24rem] relative bg-zinc-900 rounded border border-white">
                                        <input id="get-start-email" class="w-full bg-transparent pt-5 px-4 pb-2" type="text" required>
                                        <label for="get-start-email" class="absolute inset-4 ease-[ease-in] duration-[150ms]">Email Address</label>
                                    </div>

                                    <button class="flex item-center w-fit py-3.5 px-3 mt-4 tablet:mt-0 tablet:px-6 tablet:text-2xl font-medium text-white rounded bg-[#e50914] hover:bg-[#c11119] ml-2">
                                        Get Started</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <div class="absolute w-full h-[26.25rem] left-0 bottom-0 bg-home-empty"><div></div></div>
        </section>
        <!-- Overview -->
        <section class="relative -mt-96 px-6 tablet:px-8 flex flex-col items-center">
            <div class="max-w-screen-2xl bg-[#090626] rounded-lg">
                <div
                    class="flex flex-col-reverse tablet:flex-row-reverse items-center py-2.5 px-4 tablet:py-3 tablet:px-x-tablet desktop:px-x-desktop xl-desktop:px-x-xl-desktop">
                    <div class="tablet:w-1/2 flex items-start mt-4 tablet:mt-0">
                        <img class="" src="../assets/img/landing/layout-content-1.png" alt="layout-content-1">
                    </div>
                    <div class="tablet:w-1/2 mt-4 tablet:mt-0">
                        <p class="text-display-sm font-bold desktop:text-5xl desktop:font-black mt-4">Enjoy on your TV</p>
                        <p class="desktop:text-xl desktop:font-medium mt-4">
                            Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                    </div>
                </div>
                <divider />
                <div
                    class="flex flex-col-reverse tablet:flex-row items-center py-2.5 px-4 tablet:py-3 tablet:px-x-tablet desktop:px-x-desktop xl-desktop:px-x-xl-desktop">
                    <div class="tablet:w-1/2 flex items-start mt-4 tablet:mt-0">
                        <img class="w-full" src="../assets/img/landing/layout-content-2.png" alt="layout-content-1">
                    </div>
                    <div class="tablet:w-1/2 mt-4 tablet:mt-0">
                        <p class="text-display-sm font-bold desktop:text-5xl desktop:font-black mt-4">Watch everywhere</p>
                        <p class="desktop:text-xl desktop:font-medium mt-4">
                            Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
                    </div>
                </div>
                <divider />
                <div
                    class="flex flex-col-reverse tablet:flex-row-reverse items-center py-2.5 px-4 tablet:py-3 tablet:px-x-tablet desktop:px-x-desktop xl-desktop:px-x-xl-desktop">
                    <div class="tablet:w-1/2 flex items-start mt-4 tablet:mt-0">
                        <img class="w-full" src="../assets/img/landing/layout-content-3.png" alt="layout-content-1">
                    </div>
                    <div class="tablet:w-1/2 mt-4 tablet:mt-0">
                        <p class="text-display-sm font-bold desktop:text-5xl desktop:font-black mt-4">Create profiles for kids</p>
                        <p class="desktop:text-xl desktop:font-medium mt-4">
                            Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</p>
                    </div>
                </div>
                <divider />
                <div
                    class="flex flex-col-reverse tablet:flex-row items-center py-2.5 px-4 tablet:py-3 tablet:px-x-tablet desktop:px-x-desktop xl-desktop:px-x-xl-desktop">
                    <div class="tablet:w-1/2 flex items-start mt-4 tablet:mt-0">
                        <img class="w-full" src="../assets/img/landing/layout-content-4.png" alt="layout-content-1">
                    </div>
                    <div class="tablet:w-1/2 mt-4 tablet:mt-0">
                        <p class="text-display-sm font-bold desktop:text-5xl desktop:font-black mt-4">Download your shows to watch offline</p>
                        <p class="desktop:text-xl desktop:font-medium mt-4">
                            Save your favorites easily and always have something to watch.</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


<style scoped>
.background {
    background-image:
        linear-gradient(0deg, rgba(0, 8, 29, 0.7), rgba(0, 8, 29, 0.7)),
        url("~/assets/img/landing/netflix-background.jpg");
    background-repeat: no-repeat;
}

.sign-up-box {
    background: linear-gradient(0deg, rgba(0, 8, 29, 1), rgba(0, 8, 29, 1)) padding-box,
        linear-gradient(271.65deg, #233371 5.26%, #00197a 50.02%,#e50914 97.68%) border-box
}

#get-start-email:focus ~ label,
#get-start-email:not(:focus):valid ~ label {
    top: 0px;
    left: 0.75rem;
    font-size: 12px;
}
</style>
