<script setup lang="ts">
import WarningIcon from '~/assets/icons/warning.svg'
import EyeIcon from '~/assets/icons/auth/eye.svg'
import EyeOffIcon from '~/assets/icons/auth/eye-off.svg'
import SvgIcon from '~/components/SvgIcon.vue'

interface Props {
    id?: string,
    type?: string,
    label?: string,
    placeholder?: string,
    helperText?: string,
    required?: boolean,
    disabled?: boolean,
    warn?: boolean,
    modelValue?: any,
    maxLength?: number | string,
    theme?: 'light' | 'dark' | 'dark-2',
    hasClicked?: boolean,
    borderStyle?: string,
}

const { id, type = "text", label = "", placeholder, helperText = "", required, disabled = false, warn = false, modelValue, maxLength, theme = "dark", hasClicked, borderStyle } = defineProps<Props>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void
    (e: 'focusout'): void
}>()

const isFocused = ref(false)
const isLabelEmpty = computed(() => label == "")
const isPasswordShowed = ref(false)
const themeClassMap = {
    light: "!text-gray-700 !bg-white",
    dark: "!text-gray-300 !bg-[#333]", // default
    'dark-2': "!text-white !bg-zinc-900",
}

function setFocus(value: boolean) {
    isFocused.value = value
}

function onFocus() {
    setFocus(true)
}

function onUnFocus() {
    setFocus(false)
    emit('focusout')
}

function togglePassword() {
    if (!disabled) {
        isPasswordShowed.value = !isPasswordShowed.value
        setFocus(true)
    }

}

const inputType = computed(() => {
    if (type == "password") {
        return isPasswordShowed.value ? "text" : "password"
    } else {
        return type
    }
})

const handleInput = ($event) => {
    if (type == 'currency') {
        ($event.target as HTMLInputElement).value = ($event.target as HTMLInputElement).value.replace(/\D/g, '').replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    emit('update:modelValue', ($event.target as HTMLInputElement).value)
}

</script>

<template>
    <div class="relative flex flex-col flex-1 rounded-lg">
        <div class="flex flex-row items-center rounded text-white bg-zinc-900" :class="themeClassMap[theme]">
            <div :class="{ 'mr-2': $slots.left }">
                <slot name="left"></slot>
            </div>

            <div class="relative flex-auto" :class="[borderStyle]">
                <input :id="id" :value="modelValue" @input="handleInput" :type="inputType" @focusin="onFocus"
                    @focusout="onUnFocus" :disabled="disabled" :placeholder="placeholder || ' '" :required="required"
                    :maxlength="maxLength"
                    class="block px-2.5 pb-2.5 pt-5 w-full text-sm bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                    :class="{ 'border-0 border-b-2 border-orange-500': warn, 'focus:bg-[#454545]': theme.includes('dark') }" />
                <label :for="id"
                    class="absolute text-sm duration-300 transform -translate-y-4 scale-90 top-4 z-10 origin-[0] left-2.5
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4">
                    {{ label }}</label>
            </div>

            <button v-if="warn" type="button" class="absolute right-2 mx-3" disabled><img :src="WarningIcon" /></button>
            <button v-if="type == 'password'" class="absolute right-2 mx-3" :class="{ '!right-10': warn }" type="button"
                @click="togglePassword">
                <SvgIcon v-if="isPasswordShowed" :src="EyeIcon" class="stroke-2 stroke-gray-400" :height="24" :width="24" />
                <SvgIcon v-else :src="EyeOffIcon" class="stroke-2 stroke-gray-400" :height="24" :width="24" />
            </button>

            <div :class="{ 'ml-2': $slots.right }">
                <slot name="right"></slot>
            </div>
        </div>
        <p v-if="helperText && warn" :class="{ 'text-orange-500': warn, 'text-gray-500': !warn }" class="text-xs mt-1.5">
            {{ helperText }}</p>
    </div>
</template>

