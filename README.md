# 42quote-front



## Project setup
1.导入相关的依赖
```
npm install
```
2.配置后端接口地址
在vue.config.js中配置target值，将其替换成后端借口的地址。注意：http不能省略.

```
  target: 'http://0.0.0.0:8000',
```
3.检查后端借口名称。
在components/SearchBar.vue 中，将接口名称替换成后端接口名称。目前采用/api/method的形式。
```
   const url = new URL('/api/search', window.location.origin);
```

### Compiles and hot-reloads for development（使用这个命令就可以运行）
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
