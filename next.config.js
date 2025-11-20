/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dcms.ac.in'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dcms.ac.in',
        pathname: '/**',
      },
    ],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // Reduce bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;

