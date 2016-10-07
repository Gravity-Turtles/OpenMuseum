const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    './client/index.jsx'
  ],
  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js"
  },
  module: {
    preLoaders: [
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
  ],
    loaders: [
      { test: /\.jsx?$/, 
        exclude: /node_modules/, 
        loader: "babel-loader"
      },
    // CSS
      { 
        test: /\.css$/, 
        include: path.resolve(__dirname, 'client'),
        loaders: ["style", "css"]
      },
      { 
        test: /\.(png|jpg)$/, 
        loader: 'url-loader?limit=8192' }
    ]
  },  
  resolve: {
    extensions: ['', '.js', '.jsx']
  },    
  plugins: [HTMLWebpackPluginConfig],
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};