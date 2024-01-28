

// import NavBar from './components/NavBar.vue';
import HomePage from './components/HomePage.vue';
import SearchContent from './components/SearchContent.vue';
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
 
  {
    path: '/',
    component: HomePage , // 你需要替换成实际的组件名称
  },
  {
    path: '/search',
    component: SearchContent  , // 你需要替换成实际的组件名称
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
