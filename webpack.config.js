var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: './app/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'build')

  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app')
    }
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'node_modules/scratch-blocks/media',
      to: 'static/blocks-media'
    }]),
    new HtmlWebpackPlugin({
      title: 'test demo',
      template: './index.html'
    })
  ]
}
