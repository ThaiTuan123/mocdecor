import type {Config} from "tailwindcss";
import { PluginAPI } from 'tailwindcss/types/config';
import {fontFamily} from "tailwindcss/defaultTheme";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'image-footer-policy': "url('/assets/imgs/backgrounds/footer-policy.webp')",
                'image-hero-policy': "url('/assets/imgs/backgrounds/hero-policy.webp')",
                'image-hero-contact': "url('/assets/imgs/backgrounds/hero-contact.webp')",
                'image-left-error': "url('/assets/imgs/backgrounds/left-404.webp')",
                'image-hero-gallery': "url('/assets/imgs/backgrounds/hero-gallery-bg.webp')",

                // Home Page
                'image-bracelet-home': "url('/assets/imgs/backgrounds/bracelet-home.webp')",
                'image-calendar-home': "url('/assets/imgs/backgrounds/calendar-home.webp')",
                'image-notebook-home': "url('/assets/imgs/backgrounds/notebook-home.webp')",
                'image-wooden-pen-home': "url('/assets/imgs/backgrounds/wooden-pen-home.webp')",

                'image-vong-tay-home-mobile': "url('/assets/imgs/backgrounds/bg-vong-tay-mobile-1.webp')",
                'image-lich-go-mobile': "url('/assets/imgs/backgrounds/bg-lich-go-mobile-1.webp')",

                //// frame
                'image-gradient-frame': "url('/assets/imgs/backgrounds/bg-gradient-frame.webp')",

                // payment
                'hero-payment': "url('/assets/imgs/backgrounds/hero-payment.webp')",

            },
            colors: {
                'primary': '#523B18',
                'punga': '#4B3616',
                'akaroa': '#D3C1A4',
                'santaFe': '#AC744C',
                'hotCinnamon': '#D2691E',
                'category': '#AC744C',
                'calico': '#E0B894',
                'white': '#ffffff',
                'alto': '#D4D4D4',
                'pampas': '#EEEBE8',
                'black': '#111111',
                'doveGray': '#6D6D6D',
                'karaka': '#22190A',
                'stroke': '#D9D9D9',
                'black-50': '#E6E6E6',
                'black-300': '#545454',
                'layout': '#5A5A5A99',
                'caption': '#FF7F37',
                'captionHover': '#FF6F2C',
                'rating': '#FFC329',
                'notRating': '#B0B0B0',
                'bright-main': '#EEEBE8',
                'just-right': '#EACFB7',
                'done-text': '#005FEE',
                'update': '#819FE4',
                'done-background': '#F0F6FF',
                'loading-text': '#FF7F37',
                'loading-background': '#FFF3E5',
                'brown': {
                    50: '#EEEBE8',
                    100: '#C9C2B7',
                    200: '#AFA595',
                    300: '#8B7C64',
                    400: '#756246',
                    500: '#523B18',
                    600: '#4B3616',
                    700: '#3A2A11',
                    800: '#2D200D',
                    900: '#22190A',
                },
                'gray': {
                    100: '#6D6D6D',
                    200: '#edf2f7',
                    300: '#e2e8f0',
                    400: '#cbd5e0',
                    500: '#a0aec0',
                    600: '#718096',
                    700: '#4a5568',
                    800: '#2d3748',
                    900: '#1a202c',
                },
            },
            fontFamily: {
                sans: ['var(--font-raleway)', ...fontFamily.sans],
                serif: ['var(--font-playfair-display)', ...fontFamily.serif],
            },
            fontSize: {
                '0.8x': ['0.5rem', '0.5rem'],       // 8px, 8px
                'x':  ['0.625rem', '0.75rem'],       // 10px, 12px
                'xs': ['0.75rem', '0.875rem'],       // 12px, 14px
                '4.2xl': ['2.5rem', '3.3325rem'],      // 40px, 53.32px
                'smLh': ['0.875rem', '1.313rem'],    // 14px, 21px
                'lg': ['1rem', '1.17375rem'],       // 16px, 18.78px
                '1.25lg': ['1.125rem', '1.5725rem'], // 18px, 25.16px
                '2lg': ['1.25rem', '1.875rem'],      // 20px, 30px
                '2.25lg': ['1.5rem', '2.25rem'],     // 24px, 36px
                '5lg': ['2rem', '2.66625rem'],       // 32px, 42.66px
                '4lg': ['2.5rem', '3.3325rem'],      // 40px, 53.32px
                '6lg': ['3.75rem', '5.625rem'],      // 60px, 90px
            },
            keyframes: {
                upDown: {
                    '0%, 100%': {transform: 'translateY(0)'},
                    '50%': {transform: 'translateY(-20px)'},
                },
                fallIn: {
                    '0%': {transform: 'translateY(-50px)', opacity: '0'},
                    '100%': {transform: 'translateY(0)', opacity: '1'},
                },
                leftToRight: {
                    '0%': {transform: 'translateX(700px)', opacity: '0'},
                    '100%': {transform: 'translateX(0)', opacity: '1'},
                },
                moveUpDown: {
                    '0%, 100%': {transform: 'translateY(0)'},
                    '50%': {transform: 'translateY(-10px)'},
                },
            },
            animation: {
                upDown: 'upDown 2s infinite ease-in-out',
                fallIn: 'fallIn 0.8s ease-out forwards',
                leftToRight: 'leftToRight 0.5s ease-in-out',
                moveUpDown: 'moveUpDown 2s ease-in-out infinite',
            },
            height: {
                'background-height': '50rem', // or '932px'
                '100': '6.25rem',
                '160': '10rem',
                '150': '9.375rem',
                '220': '13.75rem',
                '301': '18.8125rem',
                '430': '26.875rem',
                '252': '15.75rem',
                '269': '16.8125rem',
                '327': '20.5rem',
                '451': '451px',
                '463': '28.9375rem',
                '480': '30rem',
                '552': '34.5rem',
                '946': '59.125rem',
                '525': '525px',
                '584': '36.5rem',
                '648': '40.5rem',
                '896': '56rem',
                '218': '13.625rem',
                '379': '23.6875rem',
                '540': '33.75rem',
            },
            maxHeight: {
                '430': '26.875rem',
                '540': '33.75rem',
                '664': '41.5rem', // custom max height
                '710px': '44.375rem', // custom max height
            },
            width: {
                '17': '4.25rem',
                '18': '4.5rem',
                '150': '9.375rem',
                '232.77': '14.55rem',
                '272': '17rem',
                '412': '25.75rem',
                '474': '29.625rem',
                '500': '31.25rem',
                '7/10': '70%', // Custom width class for 70%
                '3/10': '30%', // Custom width class for 30%
                '767': '47.9375rem',
                '920': '57.5rem',
                '327': '20.5rem',
                '375': '23.4375rem',
                '580': '36.25rem',
                '1024': '64rem',
            },
            margin: {
                navbar: '72px'
            },
            padding: {
                '16px-plus-2px': 'calc(16px + 2px)', // Custom padding value
                '56-25': '56.25%',
            },
            inset: {
                '72px': '72px',
                'u-40': '-40px',
            },
            zIndex: {
                '50': '50',
            },
            screens: {
                '3xl': '1920px',  // Adjust as needed
                '4xl': '2560px',  // Adjust as needed
            },
            borderRadius: {
               '2.5xl': '1.25rem',
            },
        },
    },
    plugins: [
        function ({ addUtilities } : { addUtilities: PluginAPI['addUtilities'] }) {
          addUtilities({
            '.no-scrollbar': {
              '-ms-overflow-style': 'none', /* IE and Edge */
              'scrollbar-width': 'none', /* Firefox */
            },
            '.no-scrollbar::-webkit-scrollbar': {
              display: 'none', /* Chrome, Safari, and Opera */
            },
          });
        },
      ],
};
export default config;
