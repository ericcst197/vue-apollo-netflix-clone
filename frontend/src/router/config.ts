import type { NavigationObject } from "~/types/navigation";

export const navlinks: NavigationObject[] = [
    {
        name: "Home",
        path: "/browse",
    },
    {
        name: "TV Shows",
        path: "#",
        disabled: true,
    },
    {
        name: "Movies",
        path: "#",
        disabled: true,
    },
    {
        name: "New & Popular",
        path: "#",
        disabled: true,
    },
    {
        name: "My List",
        path: "/browse/my-list",
    },
    {
        name: "Browse by Language",
        path: "#",
        disabled: true,
    }
]
