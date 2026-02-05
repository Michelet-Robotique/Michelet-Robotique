/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.NODE_ENV === 'production' ? '/Michelet-Robotique' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/Michelet-Robotique/' : '',
    images: {
        unoptimized: true,
    },
    compiler: {
        styledComponents: true,
    },
    transpilePackages: ['three'],
    trailingSlash: true,
};

module.exports = nextConfig;
