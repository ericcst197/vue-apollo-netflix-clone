<script setup lang="ts">
interface Props {
    src?: string,
    icon?: string,
    height?: number,
    width?: number,
}
const { src = "", icon, height = 20, width = 20 } = defineProps<Props>()
const svgRef = ref<HTMLSpanElement>()

const iconSrc = computed(() => icon || src)

onBeforeMount(() => {
    // Get the file
    fetch(iconSrc.value).then((res) => {
        res.text().then((text) => {
            let element = new DOMParser().parseFromString(text, 'image/svg+xml') as XMLDocument

            element.documentElement.setAttribute('height', height.toString())
            element.documentElement.setAttribute('width', width.toString())
            // element.documentElement.setAttribute('viewBox', `0 0 ${width} ${height}`)
            // console.log(element.documentElement)
            // Remove stroke attrs in all paths
            element.querySelectorAll('path').forEach((el) => {
                el.removeAttribute('stroke')
                el.removeAttribute('stroke-width')
            })
            if (svgRef.value)
                svgRef.value.appendChild(element.documentElement)
        })
    })
})

</script>

<template>
    <span ref="svgRef"></span>
</template>
