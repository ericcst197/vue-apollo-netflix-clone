/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                "spin-r": "spin-r 1s linear infinite",
            },
            screens: {
                "tablet-sm": "500px",
                tablet: "600px",
                laptop: "960px",
                desktop: "1280px",
                "desktop-xl": "1920px",
            },
            fontSize: {
                "display-2xl": ["88px", "100px"],
                "display-xl": ["66px", "78px"],
                "display-lg": ["48px", "60px"],
                "display-md": ["40px", "48px"],
                "display-sm": ["32px", "40px"],
                "display-xs": ["24px", "36px"],
            },
            keyframes: {
                "spin-r": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(-360deg)" },
                },
            },
            padding: {
                "x-mobile": "min(10%, 1rem)",
                "x-tablet": "min(10%, 6rem)",
                "x-desktop": "min(10%, 6.25rem)",
                "x-desktop-xl": "min(10%, 9.5rem)",
            },
            transitionTimingFunction: {
                "ease-in": "cubic-bezier(0.5, 0, 0.1, 1)",
            },
            backgroundImage: {
                "home-empty":
                    "linear-gradient(180deg, rgba(0, 8, 29, 0) 0%, #00081D 93.46%)",
            },
            transitionTimingFunction: {
                "faq-disclosure": "cubic-bezier(0.5, 0, 0.1, 1)",
            },
        },
    },
    plugins: [
        require("@tailwindcss/aspect-ratio"),
        require('tailwindcss-3d')({ legacy: true }),
    ],
};
