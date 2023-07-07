/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                tablet: "600px",
                laptop: "960px",
                desktop: "1280px",
                "xl-desktop": "1916px",
            },
            fontSize: {
                "display-2xl": ["88px", "100px"],
                "display-xl": ["66px", "78px"],
                "display-lg": ["48px", "60px"],
                "display-md": ["40px", "48px"],
                "display-sm": ["32px", "40px"],
                "display-xs": ["24px", "32px"],
            },
            padding: {
                "x-mobile": "min(10%, 1rem)",
                "x-tablet": "min(10%, 6rem)",
                "x-desktop": "min(10%, 6.25rem)",
                "x-xl-desktop": "min(10%, 9.5rem)",
            },
            transitionTimingFunction: {
                "ease-in": "cubic-bezier(0.5, 0, 0.1, 1)",
            },
        },
    },
    plugins: [require("@tailwindcss/aspect-ratio")],
};
