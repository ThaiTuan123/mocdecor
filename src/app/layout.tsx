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

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vn">
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
