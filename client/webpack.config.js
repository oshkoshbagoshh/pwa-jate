// imports 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

// export the webpack config
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // output file 
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        // webpack plugin to generate an HTML file that includes all webpack bundles in the body using script tags
        new HtmlWebpackPlugin({
          template: './index.html',
          title: 'JATE'
        }),
        // Injects a service worker into the build
        new InjectManifest({
          swSrc: './src-sw.js',
          swDest: 'src-sw.js',
        }),
        // webpack plugin that generates a manifest.json file based on a template. This manifest.json file is used by PWAs to store metadata about the app.
        new WebpackPwaManifest({
          fingerprints: false,
          inject: true,
          name: 'Just Another Text Editor',
          short_name: 'JATE',
          description: 'Just another text editor',
          background_color: '#8EBAFF',
          theme_color: '#8EBAFF',
          start_url: '/',
          publicPath: '/',
          icons: [
            {
              src: path.resolve('src/images/logo.png'),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join('assets', 'icons'),
            },
          ],
        }),
  
    ],

    // webpack module
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
