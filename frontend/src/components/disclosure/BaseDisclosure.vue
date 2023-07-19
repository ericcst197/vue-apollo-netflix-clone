<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

</script>

<template>
    <Disclosure as="div" class="flex flex-col" v-slot="{ open }">
        <DisclosureButton as="div" class="flex flex-row justify-between items-center cursor-pointer p-6 hover:bg-[#4e4e4e]">
            <slot name="button" :open="open"></slot>
        </DisclosureButton>
        <DisclosurePanel as="div" class="p-6 border-t-[1px] border-[#00081d]">
            <slot name="content"></slot>
        </DisclosurePanel>
    </Disclosure>
</template>


