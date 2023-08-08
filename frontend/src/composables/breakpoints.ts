import { onMounted, onUnmounted, ref } from "vue";

export function useBreakpoints() {
    const width = ref<number>(0);
    const height = ref<number>(0);
    const widthBreaks = {
        tablet: 600,
        laptop: 960,
        desktop: 1280,
        "xl-desktop": 1920,
    };

    const getCurrentBreakpoint = computed(() => {
        if (width.value >= widthBreaks.tablet) return "tablet";
        if (width.value >= widthBreaks.desktop) return "desktop";
        if (width.value >= widthBreaks["xl-desktop"]) return "xl-desktop";
        return "mobile";
    });

    onMounted(() => {
        update();
        window.addEventListener("resize", (event) => {
            update();
        });
    });

    onUnmounted(() => {
        window.removeEventListener("resize", (event) => {
            update();
        });
    });

    function update() {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
    }

    return { width, height, getCurrentBreakpoint };
}
