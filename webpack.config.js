const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: `${__dirname}/src/index.tsx`,
  mode: process.env.NODE_ENV,
  output: {
    path: `${__dirname}/dist`,
    filename: "bundle.js",
  },
  devtool: "source-map",
  devServer: {
    allowedHosts: "all",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {},
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new ESLintPlugin({
      context: `${__dirname}/src`,
      extensions: ["js", "jsx"],
    }),
    new HtmlWebpackPlugin({
      title: "DatoCMS plugin",
      minify: isProduction,
    }),
  ].filter(Boolean),
};
