import metadata from '@/configs/metadata';
import "./app.css";
import React from "react";
import { Footer, Header } from '@/components';

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
                <div className='w-full'>
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}
