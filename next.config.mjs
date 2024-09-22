/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: '1000marcas.net',
            },
            {
                hostname: 'cdn6.aptoide.com',
            },
            {
                hostname: 'raw.githubusercontent.com',
            }
        ]
    }
};

export default nextConfig;