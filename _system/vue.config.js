const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: ".",
  transpileDependencies: true,
  devServer: {
    hot: true,
    port: 5123,
    client: {
      webSocketURL: 'http://0.0.0.0:5123/ws',
    },
  },
  pwa: {
    name: "Sinnbild",
    themeColor: "#000000",
  }
});
