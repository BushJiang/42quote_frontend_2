// import Vue from 'vue'
// import App from './App.vue'
// import './assets/tailwind.css'



// Vue.config.productionTip = false;

// new Vue({
 
//   render: h => h(App)
// }).$mount('#app');
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';

// 创建 Vue 应用实例
const app = createApp(App);

// 使用路由
app.use(router);

// 挂载 Vue 应用实例到 #app 元素上
app.mount('#app');

