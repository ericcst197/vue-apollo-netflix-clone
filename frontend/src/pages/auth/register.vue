<script setup lang="ts">
import RegisterStep from '~/assets/img/register/register-step.png'
import Button from '~/components/Button.vue';

// Composable Instances
const router = useRouter()

</script>

<template>
    <div class="max-w-[978px] mx-auto pt-5 pb-14 px-8">
        <div class="max-w-[340px] mx-auto mt-20 mb-5 tablet:text-center">
            <img class="mx-auto" :src="RegisterStep" alt="register-step-img">
            <!-- <span class="text-sm tracking-wider">STEP <b>1</b> of <b>3</b></span> -->
            <h1 class="text-display-sm font-medium mb-[0.4em] leading-tight">Finish setting up your account</h1>
            <p class="text-[18px] leading-tight">Netflix is personalized for you.<br>
                Create a password to start watching Netflix.</p>
            <Button mode="primary" class="w-full min-h-[64px] rounded mt-6" content-class="text-2xl font-normal"
                @click="router.push('/signup/regform')">
                Next</Button>
        </div>
    </div>
</template>
