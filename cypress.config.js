const { defineConfig } = require('cypress');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
      webpackConfig: {
        resolve: {
          alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
          },
        },
      },
    },
  },
});
