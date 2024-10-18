/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "eraven.ru",
            },
            {
                protocol: "https",
                hostname: "eraven.ru",
            },
            {
                protocol: "http",
                hostname: "89.111.170.250",
            },
        ]
    },
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    basePath: '/distortions'
};

export default nextConfig;
