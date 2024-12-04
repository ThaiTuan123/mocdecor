/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
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
                hostname: 'api.mocdecor.org',
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
        ],
    },
};

export default nextConfig;
