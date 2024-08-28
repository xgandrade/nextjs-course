/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: '1000marcas.net',
            },
        ]
    }
};

export default nextConfig;
