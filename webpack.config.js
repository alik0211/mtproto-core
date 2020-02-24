const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: {
    index: './src/__tests__/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  plugins: [new Dotenv()],

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
