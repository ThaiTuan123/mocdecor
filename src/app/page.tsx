import HomePage from '@/app/home/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mộc Decor | Trang chủ - Nơi lưu giữ yêu thương và kỉ niệm của bạn',
  description:
    'Mộc Decor chuyên in ảnh chất lượng cao và thủ công mỹ nghệ tinh xảo, cung cấp giải pháp trang trí độc đáo và cá nhân hóa cho ngôi nhà và doanh nghiệp của bạn.',
  keywords: [
    'Ảnh In',
    'Khung Ảnh',
    'Album Ảnh',
    'Trang trí nhà cửa',
    'Thủ công mỹ nghệ',
    'Mộc Decor',
  ],
  applicationName: 'Mộc Decor',
  authors: [
    { name: 'Tuanvpt', url: 'https://tuanvo-profile.web.app/' },
    { name: 'Lam', url: 'https://nextjs.org' },
  ],
  creator: 'Tuanvpt',
  publisher: 'Mộc Decor',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Mộc Decor | Trang chủ - Nơi lưu giữ yêu thương và kỉ niệm của bạn',
    description:
      'Mộc Decor chuyên in ảnh chất lượng cao và thủ công mỹ nghệ tinh xảo, cung cấp giải pháp trang trí độc đáo và cá nhân hóa cho ngôi nhà và doanh nghiệp của bạn.',
    url: 'https://raw.githubusercontent.com/ThaiTuan123/mocdecor/refs/heads/main/public/assets/imgs/pictures/og-image.png',
    siteName: 'Mộc Decor',
    type: 'website',
    locale: 'vi_VN',
    images: [
      {
        url: 'https://raw.githubusercontent.com/ThaiTuan123/mocdecor/refs/heads/main/public/assets/imgs/pictures/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mộc Decor - Nơi lưu giữ yêu thương và kỉ niệm của bạn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mocdecor',
    creator: '@tuanvpt',
    title: 'Mộc Decor | Trang chủ - Ảnh In, Khung Ảnh, Album Ảnh',
    description:
      'Mộc Decor chuyên in ảnh chất lượng cao và thủ công mỹ nghệ tinh xảo, cung cấp giải pháp trang trí độc đáo và cá nhân hóa cho ngôi nhà và doanh nghiệp của bạn.',
    images: [
      'https://raw.githubusercontent.com/ThaiTuan123/mocdecor/refs/heads/main/public/assets/imgs/pictures/og-image.png',
    ],
  },
  alternates: {
    canonical: 'https://mocdecor.com',
    languages: {
      'vi-VN': '/vi-VN',
    },
  },
};

export default function Home() {
  return <HomePage />;
}
