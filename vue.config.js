// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

// module.exports = {
//   // ...其他配置...
//   devServer: {
//     // proxy 用于在本地开发环境中代理API请求到后端服务器。这是一种常见的解决跨域问题的方法，允许您的前端应用在本地开发时轻松地与后端服务通信。
//     // 只用于开发：proxy 设置仅在本地开发服务器运行时有效。它不适用于生产环境，在生产环境中，您的前端应用应直接与后端服务通信。

//     // proxy: {
//     //   '/api': {
//     //     target: 'http://127.0.0.1:8000',
//     //     changeOrigin: true,
//     //     pathRewrite: {
       
//     //     }
//     //   }
//     // }

//     allowedHosts: ['four2quote-frontend-2.onrender.com', 'localhost'],
//     // 如果您决定完全禁用主机检查（仅用于本地开发环境）:
//     // disableHostCheck: true,




//   }
// };






const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  // ...其他配置...
  devServer: {
    // ...其他 devServer 配置...

    // 添加以下配置以支持 WebSocket 安全连接
    https: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
});