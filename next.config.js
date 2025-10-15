/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'preview.redd.it',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'delture.com',
      },
      {
        protocol: 'https',
        hostname: 'stratavue.app',
      },
      {
        protocol: 'https',
        hostname: 'packaged-media.redd.it',
      },
      {
        protocol: 'https',
        hostname: 'i.redd.it',
      },
    ],
  },
  experimental: {
    // This is required to allow requests from the development environment.
    allowedDevOrigins: ['*.cloudworkstations.dev'],
  },
};

module.exports = nextConfig;
