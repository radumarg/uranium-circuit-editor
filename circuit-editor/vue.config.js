const path = require("path");

module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    contentBase: [
      path.join(__dirname, './src/store/modules/wasm/'),
    ],
    contentBasePublicPath: '/wasm'
  },
};