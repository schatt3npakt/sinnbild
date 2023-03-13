const { defineConfig } = require("@vue/cli-service");
const fs = require('fs');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    hot: false,
    https: {
      key: fs.readFileSync('./ssl/key.pem'),
      cert: fs.readFileSync('./ssl/cert.pem'),
    },
    port: 5123,
    client: {
      webSocketURL: 'https://0.0.0.0:5123/ws',
    },
  },
  pwa: {
    name: "Sinnbild",
    themeColor: "#000000",
  }
});
