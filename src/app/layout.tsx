// src/app/layout.tsx or src/app/RootLayout.tsx
"use client";
import "./app.css";
import React from "react";
import {Analytics} from "@vercel/analytics/react"
import {Footer, Header} from '@/components';
import {SpeedInsights} from '@vercel/speed-insights/next';
import DisableAnimations from "@/components/disableAnimationMobile/DisableAnimations";
import FloatingButtons from "@/components/floating/FloatingButton";
import {RecoilRoot} from 'recoil'; // Import RecoilRoot
import { Raleway, Playfair_Display } from 'next/font/google';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400', '700'], // Include only the weights used
    variable: '--font-raleway', // Add as CSS variable
});

const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '700'], // Include only the weights used
    variable: '--font-playfair-display', // Add as CSS variable
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vn" className={`${raleway.variable} ${playfairDisplay.variable}`}>
        <body className='w-full !scroll-smooth'>
        <DisableAnimations>
            <RecoilRoot>
                <Header/>
                <div className='w-full overflow-hidden mt-navbar'>
                    {children}
                    <SpeedInsights/>
                    <Analytics/>
                </div>
                <Footer/>
                <FloatingButtons/>
            </RecoilRoot>
        </DisableAnimations>
        </body>
        </html>
    );
}
