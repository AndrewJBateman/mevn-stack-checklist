module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
        },
      },
    },
  },

  devServer: {
    "/": {
      target: "http://localhost:8080/",
    },
  },
  transpileDependencies: ["vuetify"],
};
