import metadata from '@/configs/metadata';
import "./app.css";
import React from "react";
import { Footer, Header } from '@/components';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Export metadata for use in Next.js
export {metadata};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vn">
            <body className='w-full'>
                <Header />
                <div className='w-full mt-navbar'>
                    {children}
                    <SpeedInsights />
                </div>
                <Footer />
            </body>
        </html>
    );
}
