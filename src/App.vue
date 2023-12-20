<template>
  <div class="bg-gray-100">
    <nav-bar />
    <search-bar @search="search" />
    <quotes-grid :quotes="quotes" />
    <app-footer />
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


