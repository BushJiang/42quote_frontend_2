const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    allowedHosts: ['four2quote-frontend-2.onrender.com', 'localhost'],
  }
};
