/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1920], // Kích thước viewport phổ biến
    imageSizes: [16, 32, 48, 64, 96], // Kích thước icon hoặc hình nhỏ
    formats: ['image/webp'], // Ưu tiên sử dụng WebP
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 's3-alpha-sig.figma.com',
      },
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
      {
        protocol: 'https',
        hostname: 'api.mocdecor99.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.mocdecor99.com',
      },
      {
        protocol: 'https',
        hostname: 'mocdecor99.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'p16-oec-va.ibyteimg.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'content.pancake.vn',
      },
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
  },
};

export default nextConfig;
