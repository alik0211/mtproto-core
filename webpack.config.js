const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sourcePath = path.resolve(__dirname, './src');

module.exports = {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: {
    index: './src/__playground/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.join(sourcePath, './__playground/index.html'),
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3001,
    open: true,
    overlay: true,

    https: true,
    liveReload: true,
    hot: false,
    // inline: false,
  },
};
