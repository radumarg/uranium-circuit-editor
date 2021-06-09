const path = require("path");

module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    contentBase: [
      path.join(__dirname, './src/wasm/moara_js'),
    ],
    contentBasePublicPath: '/wasm/moara_js'
  },
};