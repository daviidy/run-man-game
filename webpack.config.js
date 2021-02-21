const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js',
    'production-dependencies': ['phaser']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.posix.join(
            path.resolve(__dirname, "assets").replace(/\\/g, "/"),
            "**",
            "*"
          ),
          //from: path.resolve(__dirname, 'assets'),
          to: path.resolve(__dirname, 'dist'),
          //noErrorOnMissing: true
        },
        {
          from: path.resolve(__dirname, 'index.html'),
          to: path.resolve(__dirname, 'dist')
        }
      ]

    }),

    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'production-dependencies',
      filename: 'production-dependencies.bundle.js'
    }),
  ]

};
