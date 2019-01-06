const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

const devMode = process.env.NODE_ENV !== "production";

const webpack = {
  common: {
    entry: "./src/index.ts",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "build")
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader"
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html"
      }),
      new CopyWebpackPlugin(['public'])
    ]
  },
  development: {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      contentBase: "./build"
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ]
  },
  production: {
    mode: "production",
    plugins: [
      new CleanWebpackPlugin(["build"]),
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].[hash].css"
      })
    ]
  }
};

module.exports = () => {
  const { common, development, production } = webpack;
  if (devMode) {
    return merge(common, development);
  } else {
    return merge(common, production);
  }
};
