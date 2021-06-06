const webpack = require('webpack')
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
//const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

const common = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        //include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  experiments: {
    topLevelAwait: true
  }
};

const clientConfig = {
  ...common,

  mode: 'development',

  name: 'client',
  target: 'web',

  entry: {
    client: [
      path.resolve(__dirname, 'src/client.js')
    ],
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'build/client'),
    //filename: '[name].js',

    filename: "static/js/[name].[chunkhash].bundle.js",
    sourceMapFilename: "static/js/[name].[chunkhash].bundle.map",
    chunkFilename: "static/js/[name].[chunkhash].chunk.js",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: module => /node_modules/.test(module.resource),
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new ProgressBarPlugin(),
    //new NodePolyfillPlugin(),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.jQuery": "jquery",
    //   w: path.resolve('src/window.mock'),
    // }),
    // new webpack.optimize.LimitChunkCountPlugin({
    //   maxChunks: 1,
    // }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[hash].styles.css"
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public' },
        //{ from: 'public/vendors', to: 'vendors' },
      ]
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "public/index.html",
    }),
  ],

  devtool: 'cheap-module-source-map',

  resolve: {
    fallback: {
      child_process: false,
      fs: false,
      module: false,
      net: false,
      tls: false,
    },
  },
};

const serverConfig = {
  ...common,

  mode: 'development',

  name: 'server',
  target: 'node',
  externals: [nodeExternals()],

  entry: {
    server: [
      path.resolve(__dirname, 'src/server/index.js')
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build/server'),
    filename: 'index.js',
  },

  plugins: [
    //new ProgressBarPlugin(),
    // new webpack.ProvidePlugin({
    //   w: path.resolve('src/window.mock'),
    //   // window: path.resolve('src/window.mock'),
    //   document: path.resolve('node_modules/global/document'),
    // }),
    // new webpack.optimize.LimitChunkCountPlugin({
    //   maxChunks: 1,
    // }),
  ],

  devtool: 'cheap-module-source-map',

  resolve: {
    fallback: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      //__filename: false,
      //__dirname: false,
    },
  },
};

module.exports = [clientConfig, serverConfig];
