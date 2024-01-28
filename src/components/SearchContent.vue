<template>
  <div class="bg-white">
    <!-- 为整个应用程序容器添加一些内边距 -->
    <div class="container mx-auto p-4">
      <!-- NavBar组件 -->
      <nav-bar class="mb-8" />
      
      <!-- SearchBar组件，添加底部外边距 -->

      <search-bar class="mb-8" @search="search" @dataReceived="handleDataReceived" @fetchError="handleFetchError"/>
      
      <!-- QuotesGrid组件，添加底部外边距 -->
      <quotes-grid class="mb-16" :quotes="quotes"  />
       <div v-if="quotes && quotes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <quote-card v-for="quote in quotes" :key="quote.id" :quote="quote" />
        </div>
     <!-- 可以在这里添加一个可选的元素，用于在 quotes 数组为空时显示 -->
     
      <!-- AppFooter组件 -->
      <app-footer />
    </div>
  </div>
</template>


<script>
import NavBar from './NavBar.vue';
import SearchBar from './SearchBar.vue';
import QuotesGrid from './QuotesGrid.vue';
import AppFooter from './AppFooter.vue';
import { inject } from 'vue';


export default {

  setup() {
   const searchQuery = inject('searchQuery');
    const activeElement = inject('activeElement');
    const selectedAuthors = inject('selectedAuthors');
    const quotes = inject('quotes');



    return { searchQuery, activeElement , selectedAuthors,quotes};
  },

  name: 'App',
  components: {
    NavBar,
    SearchBar,
    AppFooter,
    QuotesGrid
  },
  data() {
    return {
     // quotes: []
    };
  },
  methods: {
   
     handleDataReceived(data) {
      console.log('Received data from child:', data);
      this.quotes = data;
      console.log(data.result);
       console.log("找到数据了");
      // 在这里处理或存储接收到的数据
      
    },
    handleFetchError(error) {
      console.error('Error fetching data:', error);
      // 在这里处理错误
    }


  }
};
</script>


