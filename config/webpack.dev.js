const merge = require("webpack-merge");
const portfinder = require("portfinder");
const baseConfig = require("./webpack.base.js");

const devConfig = merge.merge(baseConfig, {
  // 模式
  mode: "development",
  devtool: "cheap-module-source-map",
  // webpack 解析模块加载选项
  resolve: {
    // 自动补全文件扩展名
    extensions: [".js", ".jsx", ".tsx", ".ts"],
  },
  devServer: {
    host: "localhost", // 启动服务域名
    open: true, // 启动服务端口
    port: 3000, // 是否自动打开浏览器
    hot: true,
    historyApiFallback: true,
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }
      const port = devServer.server.address().port;
      console.log("您当前运行的端口是:", port);
    },
  },
});

module.exports = new Promise((resolve, reject) => {
  // Auto find port
  portfinder.getPort(
    {
      port: 3000,
      stopPort: 8000,
    },
    (err, port) => {
      if (err) {
        reject(err);
        throw new Error("can not fond available port! try again...");
      }
      // When the port is occupied, reset the port of evn and devserver
      devConfig.devServer.port = port;
      resolve(devConfig);
    }
  );
});
