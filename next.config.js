/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
