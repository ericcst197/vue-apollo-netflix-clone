<script setup lang="ts">
import HomeHeader from '~/components/header/HomeHeader.vue'
import HomeFooter from '~/components/footer/HomeFooter.vue'
import SignUpForm from "~/components/auth/SignUpForm.vue"
import FaqDisclosure from '~/components/disclosure/FaqDisclosure.vue'

// Images & Icons
import LayoutContent1 from "~/assets/img/landing/layout-content-1.png"
import LayoutContent2 from "~/assets/img/landing/layout-content-2.png"
import LayoutContent3 from "~/assets/img/landing/layout-content-3.png"
import LayoutContent4 from "~/assets/img/landing/layout-content-4.png"

// Composables
import { usePrismic, PrismicRichText } from '@prismicio/vue'

// Helpers
import { faqSerializer } from '~/prismic/HTMLSerializers'

// Composable Instances
const { client, filter } = usePrismic()

/**
 * FEATURE : FAQs (START)
 */
 const generalFAQs = ref<any[]>([])

async function loadFAQs() {
    const general = await client.get({
        filters: [
            filter.at('document.type', 'faq'),
        ],
        orderings: {
            field: 'my.faq.order',
            direction: 'asc'
        }
    })
    generalFAQs.value = general.results
}
/**
 * FEATURE : FAQs (END)
 */

onMounted(() => {
    // Populate faq
    loadFAQs()
})
</script>

<template>
    <div class="bg-[#00081d] text-white tracking-normal">
        <!-- Hero section -->
        <section class="relative background bg-cover min-h-[56.25rem] desktop-xl:min-h-[64.125rem] px-6 tablet:px-8 desktop:px-12 ">
            <HomeHeader />

            <div class="pb-[26.25rem]">
                <div class="mx-auto max-w-[100rem] px-4 tablet:px-0">
                    <div class="pt-[60px] desktop:pt-24 tablet:px-x-tablet desktop:px-x-desktop desktop-xl:px-x-desktop-xl">
                        <div class="tablet:w-3/4 my-4">
                        <h1 class="text-display-md laptop:text-display-lg desktop:text-display-xl desktop-xl:text-display-2xl font-bold laptop:font-black">
                                Unlimited movies, TV shows, and more</h1>

                            <p class="text-lg desktop:text-2xl desktop-xl:text-3xl font-medium mt-4">Watch anywhere. Cancel anytime.</p>
                        </div>

                        <div class="mt-8 tablet:mt-10 desktop:mt-12 border-4 border-transparent rounded-lg p-4 laptop:py-6 laptop:px-11 text-lg sign-up-box">
                            <SignUpForm id="homepage-signup-box-1" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="absolute w-full h-[26.25rem] left-0 bottom-0 bg-home-empty"><div></div></div>
        </section>
        <!-- Page Content -->
        <section class="relative -mt-96 px-6 tablet:px-8 flex flex-col items-center">
            <!-- Overview -->
            <div class="max-w-screen-2xl mt-6 w-full box-border bg-[#090626] rounded-lg">
                <div
                    class="flex flex-col-reverse tablet:flex-row-reverse items-center py-2.5 px-4 tablet:py-3 tablet:px-x-tablet desktop:px-x-desktop desktop-xl:px-x-desktop-xl">
                    <div class="tablet:w-1/2 flex items-start mt-4 tablet:mt-0">
                        <img class="" :src="LayoutContent1" alt="layout-content-1">
                    </div>
                    <div class="tablet:w-1/2">
                        <p class="text-display-sm font-bold desktop:text-5xl desktop:font-black mt-4">Enjoy on your TV</p>
                        <p class="text desktop:text-xl desktop:font-medium mt-4">
                            Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                    </div>
                </div>
                <divider />
                <div
                    class="flex flex-col-reverse tablet:flex-row items-center py-2.5 px-4 tablet:py-3 tablet:px-x-tablet desktop:px-x-desktop desktop-xl:px-x-desktop-xl">
                    <div class="tablet:w-1/2 flex items-start mt-4 tablet:mt-0">
                        <img class="w-full" :src="LayoutContent2" alt="layout-content-1">
                    </div>
                    <div class="tablet:w-1/2">
                        <p class="text-display-sm font-bold desktop:text-5xl desktop:font-black mt-4">Watch everywhere</p>
                        <p class="desktop:text-xl desktop:font-medium mt-4">
                            Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
                    </div>
                </div>
                <divider />
                <div
                    class="flex flex-col-reverse tablet:flex-row-reverse items-center py-2.5 px-4 tablet:py-3 tablet:px-x-tablet desktop:px-x-desktop desktop-xl:px-x-desktop-xl">
                    <div class="tablet:w-1/2 flex items-start mt-4 tablet:mt-0">
                        <img class="w-full" :src="LayoutContent3" alt="layout-content-1">
                    </div>
                    <div class="tablet:w-1/2">
                        <p class="text-display-sm font-bold desktop:text-5xl desktop:font-black mt-4">Create profiles for kids</p>
                        <p class="desktop:text-xl desktop:font-medium mt-4">
                            Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</p>
                    </div>
                </div>
                <divider />
                <div
                    class="flex flex-col-reverse tablet:flex-row items-center py-2.5 px-4 tablet:py-3 tablet:px-x-tablet desktop:px-x-desktop desktop-xl:px-x-desktop-xl">
                    <div class="tablet:w-1/2 flex items-start mt-4 tablet:mt-0">
                        <img class="w-full" :src="LayoutContent4" alt="layout-content-1">
                    </div>
                    <div class="tablet:w-1/2">
                        <p class="text-display-sm font-bold desktop:text-5xl desktop:font-black mt-4">Download your shows to watch offline</p>
                        <p class="desktop:text-xl desktop:font-medium mt-4">
                            Save your favorites easily and always have something to watch.</p>
                    </div>
                </div>
            </div>
            <!-- FAQ -->
            <div class="max-w-screen-2xl mt-6 w-full box-border">
                <div class="flex flex-col space-y-4 mt-12 tablet:mt-[52px] pt-[3.75rem] desktop:pt-[5.875rem] tablet:pt-16 pb-12 desktop:pb-[6.25rem] desktop-xl:pb-[9.2rem]
                    px-x-mobile tablet:px-x-tablet desktop:px-x-desktop desktop-xl:px-x-desktop-xl">
                    <h2 class="mt-4 text-display-sm tablet:text-display-md font-bold">Frequently Asked Questions</h2>
                    <div >
                        <FaqDisclosure v-for="(faq, i) in generalFAQs" :title="faq.data.question[0].text">
                            <PrismicRichText :field="faq.data.content" :html-serializer="faqSerializer" />
                        </FaqDisclosure>
                    </div>
                    <SignUpForm id="homepage-signup-box-2" class="" />
                </div>
            </div>
            <!-- Footer -->
           <HomeFooter />
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

</style>
