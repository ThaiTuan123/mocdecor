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
                'image-footer': "url('/assets/imgs/pictures/image-footer.png')",
                'hero-policy': "url('/assets/imgs/pictures/hero-policy.png)"
            },
            colors: {
                'primary': '#523B18',
                'sambuca': '#3A2A11',
                'punga': '#4B3616',
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
            fontSize: {
                l: ['16px', '24px'],
            },
            keyframes: {
                upDown: {
                    '0%, 100%': {transform: 'translateY(0)'},
                    '50%': {transform: 'translateY(-20px)'},
                },
            },
            animation: {
                upDown: 'upDown 2s infinite ease-in-out',
            },
        },
    },
    plugins: [],
};
export default config;
