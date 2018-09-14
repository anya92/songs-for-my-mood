const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0',
            'stage-3',
            ['env', { targets: { browser: ['last 2 versions'] } }],
          ],
          plugins: [
            'transform-class-properties',
          ],
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=assets/[name]-[hash:6].[ext]',
          'image-webpack-loader',
        ],
      },
    ],
  },
};
