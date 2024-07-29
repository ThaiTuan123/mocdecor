import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                'pungaPrimary': '#523B18',
                'sambuca': '#3A2A11',
                'santaFe': '#AC744C',
                'hotCinnamon': '#D2691E',
                'calico': '#E0B894',
                'white': '#ffffff',
                'alto': '#D4D4D4',
                'pampas': '#EEEBE8',
                'black': '#111111',
                'doveGray': '#6D6D6D',
                'karaka': '#22190A',
            },
            fontFamily: {
                raleway: ['Raleway', 'sans-serif'],
                playfairRegular: ['Playfair Display Regular', 'serif'],
                playfairMedium: ['Playfair Display Medium', 'serif'],
                playfairBold: ['Playfair Display Bold', 'serif'],
            },
        },
    },
    plugins: [],
};
export default config;
