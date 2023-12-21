<template>
  <div class="bg-gray-100">
    <!-- 为整个应用程序容器添加一些内边距 -->
    <div class="container mx-auto p-4">
      <!-- NavBar组件 -->
      <nav-bar class="mb-8" />
      
      <!-- SearchBar组件，添加底部外边距 -->
      <search-bar class="mb-8" @search="search" />
      
      <!-- QuotesGrid组件，添加底部外边距 -->
      <quotes-grid class="mb-8" :quotes="quotes" />
      
      <!-- AppFooter组件 -->
      <app-footer />
    </div>
  </div>
</template>


<script>
import NavBar from './components/NavBar.vue';
import SearchBar from './components/SearchBar.vue';
import QuotesGrid from './components/QuotesGrid.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    SearchBar,
    QuotesGrid,
    AppFooter
  },
  data() {
    return {
      quotes: []
    };
  },
  methods: {
    search(query) {
      // 执行搜索逻辑
      console.log('搜索: ', query);
      // 假设结果
      this.quotes = [{id: 1, text: '示例金句1'}, {id: 2, text: '示例金句2'}];
    }
  }
};
</script>


