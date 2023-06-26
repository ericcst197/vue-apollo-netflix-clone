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
            },
            fontSize: {
                "display-2xl": ["72px", "90px"],
                "display-xl": ["60px", "72px"],
                "display-lg": ["48px", "60px"],
                "display-md": ["36px", "44px"],
                "display-sm": ["30px", "38px"],
                "display-xs": ["24px", "32px"],
            },
        },
    },
    plugins: [],
};
