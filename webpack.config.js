module.exports = {
  entry: "./src/App.jsx",
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  context: __dirname,
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react", "flow"]
        }
      }
    ]
  }
};
