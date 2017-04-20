var GasPlugin = require("gas-webpack-plugin");

module.exports = {
  context: __dirname + '/lib',
  entry: './entry.js',
  output: {
    path: __dirname + '/src',
    filename: 'miriaBot.js',
  },
  plugins: [
    new GasPlugin(),
  ],
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
