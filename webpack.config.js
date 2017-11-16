
module.exports = {
  entry: "./js/app.js",
  output: {
    path: __dirname + "/js",
    filename: "out.js"
  },
  devtool: 'cheap-eval-source-map',
  watch: true,
  module: {

    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loader: ['style-loader',        'css-loader',
                                'sass-loader'
                    ]
      }
    ]
  }
}
