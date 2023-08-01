<script setup lang="ts">
import Button from '~/components/Button.vue';
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
                <input :id="id" type="email" class="w-full bg-transparent pt-5 px-4 pb-2 get-start-email hover:cursor-text" placeholder=" " required>
                <label :for="id" class="absolute inset-4 ease-[ease-in] duration-[150ms] hover:cursor-text text-zinc-300">Email Address</label>
            </div>

            <Button mode="primary" content-class="tablet:text-2xl" class="w-fit py-3.5 px-3 mt-4 tablet:mt-0 tablet:px-6 tablet:ml-2">
                <template #default>
                    Get Started
                </template>
                <template #right>
                    <SvgIcon :src="ChevronRight" class="stroke-[3px] stroke-white ml-1=" :height="24" :width="24"/>
                </template>
            </Button>
        </div>
    </form>
</template>

<style>
.get-start-email:focus ~ label,
.get-start-email:not(:focus):not(:placeholder-shown) ~ label{
    top: 0.1rem;
    left: 0.75rem;
    font-size: 0.75rem;
}
.get-start-email:not(:focus):valid ~ label {
    top: 1rem;
    left: 0.75rem;
    font-size: 1rem;
}
</style>
