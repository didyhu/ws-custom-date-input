const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'demo', 'index'),
  watch: true,
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'demo')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      loader: 'babel-loader',
      query: {
        presets: [
          ["@babel/env", {
            "targets": {
              "browsers": "last 2 chrome versions"
            }
          }]
        ]
      }
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    inline: true,
    host: '127.0.0.1',
    port: 8080,
    open: true,
  }
};