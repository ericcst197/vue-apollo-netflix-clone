import { onMounted, onUnmounted, ref } from "vue";

export function useBreakpoints() {
    const width = ref<number>(0);
    const height = ref<number>(0);
    const widthBreaks = {
        "tablet-sm": 500,
        tablet: 600,
        laptop: 960,
        desktop: 1280,
        "desktop-xl": 1920,
    };

    const getCurrentBreakpoint = computed(() => {
        if (width.value >= widthBreaks.tablet) return "tablet";
        if (width.value >= widthBreaks.desktop) return "desktop";
        if (width.value >= widthBreaks["desktop-xl"]) return "desktop-xl";
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
