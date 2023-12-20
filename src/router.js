

// import NavBar from './components/NavBar.vue';
import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router';
const routes = [
 
  {
    path: '/',
    component: App, // 你需要替换成实际的组件名称
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
