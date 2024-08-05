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
                'image-footer-policy': "url('/assets/imgs/backgrounds/footer-policy.png')",
                'image-hero-policy': "url('/assets/imgs/backgrounds/hero-policy.png')",
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
                'stroke': '#D9D9D9',
                'black-50': '#E6E6E6',
            },
            fontFamily: {
                raleway: ['Raleway', 'sans-serif'],
                playfairRegular: ['Playfair Display Regular', 'serif'],
                playfairMedium: ['Playfair Display Medium', 'serif'],
                playfairBold: ['Playfair Display Bold', 'serif'],
            },
            fontSize: {
                lg: ['16px', '18.78px'],
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
