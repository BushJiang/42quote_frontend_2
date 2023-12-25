const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  // ...其他配置...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:8000',
        changeOrigin: true,
        pathRewrite: {
       
        }
      }
    }
  }
};
