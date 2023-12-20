// import Vue from 'vue'
// import App from './App.vue'
// import './assets/tailwind.css'



// Vue.config.productionTip = false;

// new Vue({
 
//   render: h => h(App)
// }).$mount('#app');
import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'; 


createApp(App).mount('#app')
App.use(router)