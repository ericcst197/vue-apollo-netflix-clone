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
        ]
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
        ]
    },
    {
        name: "browse",
        path: "/browse",
        component: () => import("~/pages/browse.vue"),
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
