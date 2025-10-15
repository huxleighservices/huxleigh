/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
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
        hostname: 'preview.redd.it',
      },
      {
        protocol: 'https',
        hostname: 'i.redd.it',
      }
    ],
  },
};

module.exports = nextConfig;
