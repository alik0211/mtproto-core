const path = require('path');

module.exports = {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3001,

    https: true,
    liveReload: false,
    hot: false,
    inline: false,
  },
};
