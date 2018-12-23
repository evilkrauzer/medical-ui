const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.jsx',

  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',

  devServer: {
    inline: false,
    proxy: {
      '/api/researche/*': {
          target: 'http://localhost:50582/api/researche/',
          secure: false,
          onProxyReq: proxyReq => {
          }
      }
  }

  },
  watch: true,
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.json', '.jsx', '.scss', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
            'source-map-loader'
        ],
        enforce: 'pre'
    },
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ],
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
    ]
  },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        filename: "index.html"
      })
    ]
}