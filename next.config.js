const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache.js');
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  reactStrictMode: true,
  images: {
    domains: ['github.com', 'picsum.photos', 'crescendoapi.duckdns.org'],
  },
};

const nextConfig = withPWA({
  dest: 'public',
  disable: !isProduction,
  runtimeCaching: runtimeCaching,
})(config);

module.exports = nextConfig;
