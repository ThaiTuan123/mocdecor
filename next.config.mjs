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
        ],
    },
};

export default nextConfig;
