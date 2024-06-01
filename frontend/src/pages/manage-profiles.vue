<script setup lang="ts">
import BaseInput from "~/components/BaseInput.vue";
import Button from "~/components/Button.vue";
import SvgIcon from "~/components/SvgIcon.vue";

// Icons & Images
import EditIconWhite from "~/assets/icons/pencil-icon-white.svg"
import ProfileImage1 from "~/assets/img/profile/netflix-profile-1.jpg"
import ProfileImage2 from "~/assets/img/profile/netflix-profile-2.jpg"
import ProfileImage3 from "~/assets/img/profile/netflix-profile-3.jpg"
import ProfileImage4 from "~/assets/img/profile/netflix-profile-4.jpg"
import ProfileImage5 from "~/assets/img/profile/netflix-profile-5.jpg"

// Composable
import { useAuthStore } from "~/pinia/auth";

// Helpers
import { convertImageToBase64 } from "~/helpers/string";
import { useSessionStorage } from '@vueuse/core'

// GraphQLs
import { useGetProfilesQuery, useUpdateProfileMutation } from '~/graphql/types';

// Composables Instances
const router = useRouter()
const auth = useAuthStore()

// INTERFACE
interface Profile{
    id: string;
    name: string;
    image: string;
    [key: string]: any
}

// STATES : CORE
const state = ref<"choose-profile" | "edit-profile">("choose-profile")

/*
* FEATURE: Fetch user profiles (START)
*/
const profiles = ref<Profile[]>([])
const selectedProfile = ref<Profile>()

const {
    result: profilesResult,
    refetch: refetchProfiles
} = useGetProfilesQuery({
    userId: auth.data.userId
})

watchEffect(async () => {
    if(profilesResult.value) {
        const images = [ProfileImage1, ProfileImage2, ProfileImage3, ProfileImage4, ProfileImage5]
        const mapProfiles = await Promise.all(
            profilesResult.value.profiles.map(async (profile, index) => {
                const imageBase64 = await convertImageToBase64(images[index])
                return {
                    id: profile.id || index.toString(),
                    image: profile.image || imageBase64,
                    name: profile.name
                }
            })
        )
        profiles.value = mapProfiles
    }
})
/*
* FEATURE: Fetch user profiles (END)
*/

/*
* FEATURE: Update user profile (START)
*/
const {
    mutate: updateProfileMutation,
    loading: isUpdateProfileLoading
} = useUpdateProfileMutation()

async function updateProfile() {
    try{
        console.log('Updating')
        if(selectedProfile.value && selectedProfile.value.name) {
            await updateProfileMutation({
                profileId: selectedProfile.value.id,
                name: selectedProfile.value.name,
                userId: auth.data.userId,
            })
        } else {
            throw new Error("Name is required")
        }
    } catch (error) {
        console.error(error)
    } finally {
        console.log("Finished")
        state.value = "choose-profile"
        selectedProfile.value = undefined
    }
}

function cancelUpdate() {
    state.value = "choose-profile"
    selectedProfile.value = undefined
}
/*
* FEATURE: Update user profile (END)
*/

watch(selectedProfile, () => {
    if(selectedProfile.value) {
        console.log(selectedProfile.value)
        state.value = "edit-profile"
    }
})

/*
* FEATURE: Fetch user profiles (END)
*/
onMounted(() => {
    sessionStorage.removeItem('profile')
})
</script>


<template>
     <div class="fixed inset-0 bg-[#141414] text-center">
        <template v-if="state === 'choose-profile'">
            <div class="absolute inset-0 animate-profile flex flex-col items-center justify-center z-[100]">
                <div>
                    <div class="my-4">
                        <h1 class="text-white text-[3.5vw]">Manage Profiles</h1>
                    </div>
                    <ul class="flex flex-row my-8 justify-center">
                        <li v-for="(profile, i) in profiles" class="mr-[2vw] last:mr-0 cursor-pointer text-gray-400 hover:text-white" :key="profile.id!"
                            @click="selectedProfile = profile">
                            <div class="">
                                <div class="relative w-[10vw] h-[10vw] rounded overflow-hidden hover:ring-4 hover:ring-gray-400">
                                    <div class="absolute inset-0">
                                        <img :src="profile.image" :alt="`Image ${i + 1}`" class="opacity-50">
                                    </div>
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <SvgIcon :src="EditIconWhite" class="!opacity-100 stroke-[5px]" :width="32" :height="32" />
                                    </div>
                                </div>
                                <span class="block text-center my-2.5 ">{{ profile.name }}</span>
                            </div>
                        </li>
                    </ul>
                    <Button mode="template" @click="router.push('/browse')"
                        class="rounded-sm bg-white hover:bg-[#e50914] hover:text-white w-20">Done</Button>
                </div>
            </div>
        </template>
        <template v-if="state === 'edit-profile' && selectedProfile">
            <div class="flex flex-col flex-1 items-center justify-center animate-profile my-16 text-white">
                <div class="relative !text-left text-white w-3/4 laptop:w-2/5">
                    <h1 class="text-[4vw]">Edit Profile</h1>
                    <divider class="!px-0 !pt-0"/>
                    <div class="flex py-[1em]">
                        <div ref="profile-avatar" class="w-[8vw] min-w-[80px] max-w-[180px] mr-[1.5vw]">
                            <img :src="selectedProfile.image" :alt="'Avatar'" class="rounded-lg">
                        </div>
                        <div ref="profile-edit" class="w-full max-w-[500px] space-y-2">
                            <h4>Name:</h4>
                            <BaseInput v-model="selectedProfile.name" class="w-full" input-style="!pt-2.5" theme="dark" required />
                        </div>
                    </div>
                    <divider class="!px-0"/>
                    <div class="flex gap-x-4 mt-8 m-b4">
                        <Button mode="template" @click="updateProfile"
                            class="rounded-sm text-black bg-white hover:bg-[#e50914] hover:text-white w-20">Done</Button>
                        <Button mode="template" @click="cancelUpdate"
                            class="rounded-sm bg-transparent text-gray-500 outline-1 outline-gray-500 hover:text-white hover:outline-white w-20">Cancel</Button>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
