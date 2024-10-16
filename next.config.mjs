/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { domains: [
            '89.111.170.250',
            'eraven.ru',
        ]},
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    cssModules: true,
};

export default nextConfig;
