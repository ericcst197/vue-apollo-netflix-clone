<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';

// Icon
import ChevronRight from '~/assets/icons/chevron-right.svg'

interface Props {
    /**
     * Compoennt ID
     */
     id: string
}

const { id } = defineProps<Props>()

</script>

<template>
    <form action="#">
        <h3 class="text-start text-lg laptop:text-xl">Ready to watch? Enter your email to create or restart your membership.</h3>
        <div class="flex flex-col tablet:flex-row tablet:items-center pt-4">
            <div class="flex flex-col flex-1 max-w-[24rem] relative bg-zinc-900 rounded border border-zinc-500">
                <input :id="id" class="w-full bg-transparent pt-5 px-4 pb-2 get-start-email hover:cursor-text " type="text" required>
                <label :for="id" class="absolute inset-4 ease-[ease-in] duration-[150ms] hover:cursor-text">Email Address</label>
            </div>

            <button class="flex items-center w-fit py-3.5 px-3 mt-4 tablet:mt-0 tablet:px-6 tablet:text-2xl font-medium text-white rounded bg-[#e50914] hover:bg-[#c11119] tablet:ml-2">
                Get Started
                <SvgIcon :src="ChevronRight" class="stroke-[3px] stroke-white ml-1" :height="24" :width="24"/>
            </button>
        </div>
    </form>
</template>

<style scoped>
.get-start-email:focus ~ label {
    top: 0.1rem;
    left: 0.75rem;
    font-size: 0.85rem;
}
.get-start-email:not(:focus):valid ~ label {
    top: 1rem;
    left: 0.75rem;
    font-size: 1rem;
}
</style>
