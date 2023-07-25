const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { tools } = require("./utils");
const { getStyleLoader } = tools;

module.exports = {
  // 入口相对路径
  entry: "./src/main.js",
  // 输出
  output: {
    // 文件的输出路径，绝对路由
    // __dirname nodejs的变量，代表当前文件的文件夹目录
    path: undefined,
    // 入口打包输出的文件名
    filename: "static/js/[name].js",
    // 图片，字体，通过type：asset处理的资源全名方式
    assetModuleFilename: "static/media/[hash:10][ext][query]",
    // 打包前将path的整个目录内容清空，在进行打包
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          // 处理css
          {
            test: /\.css$/i,
            // use 执行顺序：从右到左，从下到上
            use: getStyleLoader(),
          },
          {
            test: /\.s[ac]ss$/i,
            use: getStyleLoader("scss-loader"),
          },
          // 处理图片
          {
            test: /\.(png|jpe?g|gif|webp|svg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb转成base64
              },
            },
          },
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
            type: "asset/resource",
          },
          // 处理js
          {
            test: /\.(js|ts)x?$/,
            exclude: /node_modules/, // 排除node_modules中的js文件
            use: [
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel缓存
                  cacheCompression: false, // 关闭缓存文件压缩
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      exclude: "node_modules",
      context: path.resolve(__dirname, "../src"),
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlWebpackPlugin({
      // 模板：以public/index.html文件创建新的html文件
      // 新的文件特点：结构和原来一致，自动引入打包出的资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  // 模式
  mode: "development",
  devtool: "cheap-module-source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  // webpack 解析模块加载选项
  resolve: {
    // 自动补全文件扩展名
    extensions: [".js", ".jsx", ".tsx", ".ts"],
  },
  devServer: {
    host: "localhost", // 启动服务域名
    open: true, // 启动服务端口
    port: 9000, // 是否自动打开浏览器
    hot: true,
  },
};
