<script setup lang="ts">
import Spinner from '~/assets/icons/spinner.svg'

interface Props {
    mode?: 'primary' | 'secondary' | 'secondary-gray' | 'text' | 'text-gray' | 'template',
    disabled?: boolean,
    loading?: boolean,
    align?: 'start' | 'end' | 'center',
    leftClass?: string,
    rightClass?: string,
    contentClass?: string,
}

const { disabled = false, loading = false, mode = 'primary', align = 'center', leftClass, rightClass, contentClass } = defineProps<Props>()
const emit = defineEmits(['click:submit'])

const alignStyle = {
    start: '!justify-start',
    end: '!justify-end',
    center: '!justify-center'
}

</script>

<template>
    <button type="button" :class="{
        'text-white rounded bg-[#e50914] hover:bg-[#c11119]': mode == 'primary',
        'text-black rounded bg-white hover:bg-white/75' : mode == 'secondary',
        'text-white rounded bg-[#6D6D6E]/70 hover:bg-[#6D6D6E]/40' : mode == 'secondary-gray',
        'py-2 min-h-[40px] rounded-lg shadow-sm ': mode == 'template'
    }" class="px-3 py-2 outline-none outline-offset-0 focus:outline-[3px]" :disabled="disabled || loading"
        @click="emit('click:submit')">
        <div class="flex flex-row items-center justify-center" :class="alignStyle[align]">
            <div :class="[{ 'mr-2': $slots.left }, leftClass]">
                <slot v-if="!loading" name="left" :disabled="disabled"></slot>
                <img v-else class="animate-spin-r mr-2" :src="Spinner" />
            </div>
            <div class="text-sm font-medium opacity-100" :class="contentClass">
                <slot :disabled="disabled"></slot>
            </div>
            <div :class="[{ 'ml-2': $slots.right }, rightClass]">
                <slot name="right" :disabled="disabled"></slot>
            </div>
        </div>
    </button>

</template>
