import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        name: "home",
        path: "/",
        component: () => import("~/pages/home.vue"),
    },
    {
        name: "login",
        path: "/login",
        component: () => import("~/pages/auth/login.vue"),
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // console.log(to, from);
        // Exists when Browser's back/forward pressed
        if (savedPosition) {
            return savedPosition;
            // For anchors
        }

        if (to.hash) {
            return { selector: to.hash };
        }

        if (from.path === to.path) {
            return {};
        }

        // Scroll to top
        return { top: 0 };
    },
});

export default router;
