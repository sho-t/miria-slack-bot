module.exports = {
  context: __dirname + '/lib',
  entry: './entry.js',
  output: {
    path: __dirname + '/src',
    filename: 'miriaBot.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
