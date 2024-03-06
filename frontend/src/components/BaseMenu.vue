<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import SvgIcon from "~/components/SvgIcon.vue";

// Composables
import { useBreakpoints } from "~/composables/breakpoints";

//Icons
import ArrowIcon from "~/assets/icons/triangle-down.svg";

// Composable Instances
const breakpoints = useBreakpoints();


interface Props {
    itemContainerClass?: string,
}

const { itemContainerClass } = defineProps<Props>()

/*
STATES : CORE (START)
*/
const onHover = ref(false)
const menu = ref()
const button = ref()
const menuYOffset = ref(0)
const menuPosition = ref({
    x: 0,
    y: 0
})
/*
STATES : CORE (END)
*/

/**
 * Calculate the menu position values
 */
function calculatePositions() {
    if (button.value) {
        const div = (button.value.el as HTMLButtonElement)
        const { x, y, height } = div.getBoundingClientRect()

        menuYOffset.value = height
        menuPosition.value.x = x
        menuPosition.value.y = y
    }
}

/*
WATCHERS (START)
*/
watch(breakpoints.getCurrentBreakpoint, () => {
    // Reset everything
    clearListeners()

    // Add listeners
    let container
    if (breakpoints.getCurrentBreakpoint.value === 'desktop') {
        container = document.getElementById("main-container")
    } else {
        container = window
    }
    if (container) {
        container.addEventListener('scroll', calculatePositions)
    }
    window.addEventListener('resize', calculatePositions)
    calculatePositions()
})

watch(button, () => {
    calculatePositions()
})

watchEffect(() => {
    if (menu.value) {
        const element = menu.value.el as HTMLDivElement

        if (element) {
            // element.style.top = `${(menuPosition.value.y + menuYOffset.value).toString()}px`

            // Check if menu overflowing
            const width = document.documentElement.offsetWidth
            const currentBounds = element.getBoundingClientRect()

            const isOverflowingLeft = currentBounds.left < 0
            const isOverflowingRight = currentBounds.right > width
            const isOverflowingBottom = currentBounds.bottom > window.innerHeight

            if (!isOverflowingRight && !isOverflowingLeft) {

            }

            if (isOverflowingLeft) {
                element.style.left = "0px"
            }

            if (isOverflowingRight) {
                element.style.right = "0px"
            }

            if (isOverflowingBottom) {

            }
        }
    }
})
/*
WATCHERS (END)
*/

/**
 * Clear listeners on scrolling element
 */
function clearListeners() {
    const container = document.getElementById("main-container")
    if (container) {
        container.removeEventListener('scroll', calculatePositions)
    }
    window.removeEventListener('scroll', calculatePositions)
    window.removeEventListener('resize', calculatePositions)
}

onMounted(() => {
    calculatePositions()
})

onUnmounted(() => {
    clearListeners()
})
</script>


<template>
    <Menu as="div" class="relative" @mouseover="onHover = true" @mouseleave="onHover = false">
        <MenuButton ref="button"
            class="flex w-full justify-center rounded-md bg-transparent text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <slot></slot>
        </MenuButton>
        <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">

            <MenuItems v-if="onHover" static ref="menu" :class="itemContainerClass"
                class="absolute w-56">
                <div class="h-4 laptop:h-5 desktop:h-6"></div>
                <div class="rounded-md overflow-hidden divide-y divide-gray-800 opacity-100 shadow-lg ring-1 ring-black/5">
                    <slot name="items"></slot>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>
