const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === "development";
const isProd = NODE_ENV === "production";
/**
 * 用来获取处理样式的loader
 * @param {*} pre
 * @returns
 */
function getStyleLoader(pre) {
  return [
    isProd ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    pre,
  ].filter(Boolean);
}

exports.tools = {
  getStyleLoader,
  isDev,
  isProd,
};
