import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';


// Font Awesome 相关导入
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faStar, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// 将图标添加到 Font Awesome 库
library.add(faSearch, faStar, faCommentDots);

// 创建 Vue 应用实例
const app = createApp(App);

// 全局注册 Font Awesome 组件
app.component('font-awesome-icon', FontAwesomeIcon);

// 使用路由
app.use(router);

// 挂载 Vue 应用实例到 #app 元素上
app.mount('#app');

