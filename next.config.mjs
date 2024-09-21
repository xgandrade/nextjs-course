/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: '1000marcas.net',
            },
            {
                hostname: 'raw.githubusercontent.com',
            }
        ]
    }
};

export default nextConfig;
