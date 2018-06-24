const path = require("path");
const webpack = require("webpack");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

const res = p => path.resolve(__dirname, p);

const entry = res("../server/render.tsx");
const output = res("../buildServer");

module.exports = {
  name: "server",
  mode: "production",
  target: "node",
  devtool: "source-map",
  entry: [entry],
  output: {
    path: output,
    filename: "[name].js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ExtractCssChunks.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".css", ".ts", ".tsx"],
  },
  plugins: [
    new ExtractCssChunks({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};
