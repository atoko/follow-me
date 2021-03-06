var webpack = require('webpack');

module.exports = {
  entry: [   
    //'webpack/hot/only-dev-server',  
    //'webpack-dev-server/client?http://192.168.0.22:8080',
    './source/index.js'
  ], 
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/distribution',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './distribution',
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    /*new webpack.ProvidePlugin({
      'fetch': 'whatwg-fetch'
    })*/
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),    
  ]  
};