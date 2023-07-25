// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// MiniCssExtractPlugin.loader
/**
 * 用来获取处理样式的loader
 * @param {*} pre
 * @returns
 */
function getStyleLoader(pre) {
  return [
    "style-loader",
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
};
