// src/app/layout.tsx
'use client';
import './app.css';
import './fonts.css'; // Import font definitions
import React, { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Footer, Header } from '@/components';
import { SpeedInsights } from '@vercel/speed-insights/next';
import DisableAnimations from '@/components/disableAnimationMobile/DisableAnimations';
import FloatingButtons from '@/components/floating/FloatingButton';
import { RecoilRoot } from 'recoil';
import { Playfair_Display } from 'next/font/google';
import Hotjar from '@hotjar/browser';

const siteId = 5253633;
const hotjarVersion = 6;

// Chỉ sử dụng Google Fonts cho Playfair Display
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
  useEffect(() => {
    Hotjar.init(siteId, hotjarVersion);
  }, []);
  return (
    <html lang="vi" className={`${playfairDisplay.variable}`}>
      <body className="w-full !scroll-smooth">
        <DisableAnimations>
          <RecoilRoot>
            <Header />
            <div className="mt-navbar w-full overflow-hidden">
              {children}
              <SpeedInsights />
              <Analytics />
            </div>
            <Footer />
            <FloatingButtons />
          </RecoilRoot>
        </DisableAnimations>
      </body>
    </html>
  );
}
