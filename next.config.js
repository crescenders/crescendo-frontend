/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['github.com', 'picsum.photos', 'crescendoapi.duckdns.org'],
  },
};

module.exports = nextConfig;
