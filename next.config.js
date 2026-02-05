/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '',
    assetPrefix: '',
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
