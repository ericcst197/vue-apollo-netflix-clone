import { defineConfig } from 'vite'
import path from "path";
import Vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        // enable hydration mismatch details in production build
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
    },
    resolve: {
        alias: {
            "~/": `${path.resolve(__dirname, "src")}/`,
        },
        dedupe: ["vue"],
    },
    plugins: [
        Vue(),
        AutoImport({
            vueTemplate: true,
            dirs: ["src/composables"],
            dts: "src/auto-imports.d.ts",
            imports: ["vue", "vue-router"],
        }),
    ],
    envPrefix: "VUE",
})
