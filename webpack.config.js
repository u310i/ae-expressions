const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src/index.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  mode: "production",
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  }
};
