<script setup lang="ts">
import BaseInput  from '~/components/BaseInput.vue'
import Button from '~/components/Button.vue';
import SvgIcon from '~/components/SvgIcon.vue';

// Icon
import ChevronRight from '~/assets/icons/chevron-right.svg'

interface Props {
    /**
     * Compoennt ID
     */
     id: string
}

const { id } = defineProps<Props>()

// Input states
const email = ref<string>("")

</script>

<template>
    <form action="#">
        <h3 class="text-start text-lg laptop:text-xl">Ready to watch? Enter your email to create or restart your membership.</h3>
        <div class="flex flex-col tablet:flex-row tablet:items-center pt-4">
            <!-- <div class="flex flex-col flex-1 max-w-[24rem] relative bg-zinc-900 rounded border border-zinc-500">
                <input :id="id" type="email" class="w-full bg-transparent pt-5 px-4 pb-2 get-start-email hover:cursor-text" placeholder=" " required>
                <label :for="id" class="absolute inset-4 ease-[ease-in] duration-[150ms] hover:cursor-text text-zinc-300">Email Address</label>
            </div> -->
            <BaseInput :id="id" label="Email Address" type="email" v-model="email" class="max-w-[24rem] border border-zinc-500" theme="dark" />
            <Button mode="primary" content-class="tablet:text-2xl" class="w-fit py-3.5 px-3 mt-4 tablet:mt-0 tablet:px-6 tablet:ml-2">
                <template #default>
                    Get Started
                </template>
                <template #right>
                    <SvgIcon :src="ChevronRight" class="stroke-[3px] stroke-white" :height="24" :width="24"/>
                </template>
            </Button>
        </div>
    </form>
</template>

