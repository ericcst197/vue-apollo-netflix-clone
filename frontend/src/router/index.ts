import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";

import { useAuthStore } from "~/pinia/auth";

const routes: RouteRecordRaw[] = [
    {
        name: "home",
        path: "/",
        component: () => import("~/pages/home.vue"),
        meta: { noAuthOnly: true },
    },
    {
        name: "browse",
        path: "/browse",
        component: () => import("~/layouts/EmptyRouterPage.vue"),
        children: [
            {
                name: "browse-movies",
                path: "",
                component: () =>
                    import("~/pages/browse.vue"),
            },
            {
                name: "browse-my-list",
                path: "my-list",
                component: () =>
                    import("~/pages/my-list.vue"),
            },
        ],
        redirect: "/browse",
        meta: { requiresAuth: true }
    },
    {
        name: "profiles",
        path: "/profiles",
        component: () => import("~/layouts/EmptyRouterPage.vue"),
        children: [
            {
                name: "manage-profiles",
                path: "manage",
                component: () =>
                    import("~/pages/manage-profiles.vue"),
            },
        ]
    },
    {
        name: "login",
        path: "/login",
        component: () => import("~/pages/auth/login.vue"),
        meta: { noAuthOnly: true },
    },
    {
        name: "signup",
        path: "/signup",
        component: () => import("~/pages/auth/signup.vue"),
        children: [
            {
                name: "registration",
                path: "registration",
                component: () =>
                    import("~/pages/auth/register.vue"),
            },
            {
                name: "registration-form",
                path: "regform",
                component: () =>
                    import("~/pages/auth/regform.vue"),
            },
        ],
        meta: { noAuthOnly: true },
    },
    {
        name: "setup-new-profiles",
        path: "/simpleSetup",
        component: () => import("~/layouts/EmptyRouterPage.vue"),
        children: [
            {
                name: "newProfiles",
                path: "newProfiles",
                component: () =>
                    import("~/pages/simpleSetup.vue"),
            },
        ],
        meta: { noAuthOnly: true },
    },
    {
        name: "not-found",
        path: "/:path(.*)*",
        redirect: "/",
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // console.log(to, from);
        // Exists when Browser's back/forward pressed
        if (savedPosition) {
            return savedPosition;
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

router.beforeEach(async (to, from) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.isAuthenticated && !from.path.includes("login")) {
        return {
            path: '/login'
        }
    }

    if (to.meta.noAuthOnly && authStore.isAuthenticated) {
        return {
            path: "/browse",
        };
    }

    return true;
})

export default router;
