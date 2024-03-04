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
        if (width.value >= widthBreaks["desktop-xl"]) return "desktop-xl";
        if (width.value >= widthBreaks.desktop) return "desktop";
        if (width.value >= widthBreaks.laptop) return "laptop";
        if (width.value >= widthBreaks.tablet) return "tablet";
        return "mobile";
    });

    const greater = (breakpoint: string) => {
        return widthBreaks[breakpoint] && width.value > widthBreaks[breakpoint];
    }

    const smaller = (breakpoint: string) => {
        return widthBreaks[breakpoint] && width.value < widthBreaks[breakpoint];
    }

    const between = (min: string, max: string) => {
        return widthBreaks[min] && widthBreaks[max] && width.value > widthBreaks[min] && width.value < widthBreaks[max];
    }


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

    return { width, height, getCurrentBreakpoint, greater, smaller, between };
}
