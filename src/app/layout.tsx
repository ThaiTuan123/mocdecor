import metadata from '@/configs/metadata';
import "./app.css";
import React from "react";

// Export metadata for use in Next.js
export {metadata};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vn">
        <body>{children}</body>
        </html>
    );
}
