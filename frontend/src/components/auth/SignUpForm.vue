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

// Composables Instances
const router = useRouter()

/**
 * Input Validity
 */
const validity = computed(() => {
    return {
        email: {
            isValid: validateEmail(email.value || ""),
            errorMessage: "Please enter a valid email address."
        },
    }
})

// Input states
const trySignUp = ref(false)
const email = ref<string>("")

const borderStyle = computed(() => {
    if(trySignUp.value && validity.value.email.isValid) {
        return 'border border-green-500'
    } else if((trySignUp.value && !validity.value.email.isValid) || (trySignUp.value && email.value == '')) {
        return 'border border-orange-500'
    } else return 'border border-zinc-500'
})

const validateEmail = (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

function signup(){
    trySignUp.value = true
    if(validity.value.email.isValid){
        router.push('/signup/registration')
    }
}

watchEffect(() => {

})

</script>

<template>
    <form action="#">
        <h3 class="text-start text-lg laptop:text-xl">
            Ready to watch? Enter your email to create or restart your membership.
        </h3>
        <div class="flex flex-col tablet:flex-row tablet:items-center pt-4">
            <BaseInput :id="id" label="Email Address" type="email" v-model="email" class="max-w-[24rem]"
                :helperText="trySignUp && validity.email.isValid && email !== '' ? '' : validity.email.errorMessage" :hasClicked="trySignUp"
                :warn="trySignUp && !validity.email.isValid" theme="dark" required :borderStyle="borderStyle"/>
            <Button mode="primary" content-class="tablet:text-2xl" @click="signup" :class="{'!-mt-6' : borderStyle.includes('orange')}"
                class="w-fit py-[11px] px-3 mt-4 tablet:mt-0 tablet:px-6 tablet:ml-2" >
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

