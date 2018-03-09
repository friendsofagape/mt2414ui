const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    './src/index.jsx'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:3000' })
  ],
  devServer: {
    contentBase: './public',
    hot: true,
    port: 3000,
    historyApiFallback: true
  },
  performance: { hints: false }
};