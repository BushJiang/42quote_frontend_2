<template>
 <simple-nav-bar class="mb-8" />
  <div class="bg-white h-screen flex flex-col justify-center items-center mt-[-80px]">
   
    <div class="flex justify-center items-center mb-4">
      <!-- Logo -->
      <img src="@/assets/logo.png" alt="Logo" class="w-16 h-16">
      <!-- Main Title "活水金句" aligned with Logo -->
    </div>
    <!-- Subtitle below Logo and Title -->
    <h2 class="text-lg text-gray-1000 mb-6">古今佳句，一触即得，灵感随时触发</h2>
    <!-- Search Bar centered below Subtitle -->
    <search-bar class="w-full mb-6" @search="search" @dataReceived="handleDataReceived" @fetchError="handleFetchError"/>
    <p class="text-base text-gray-400 mb-4">可以尝试搜索</p>
    <div class="flex flex-wrap justify-center">
      <button v-for="hint in searchHints" :key="hint" @click="triggerSearch(hint)" class="m-1 p-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-600">
        {{ hint }}
      </button>
    </div>
  </div>
</template>




<script>

import SearchBar from './SearchBar.vue';
import SimpleNavBar from './SimpleNavBar.vue';
import { inject } from 'vue';


export default {

  name: 'App',
  components: {
    SimpleNavBar,
    SearchBar,
   
  },


 
setup() {
    const searchQuery = inject('searchQuery');
    const activeElement = inject('activeElement');
    const selectedAuthors = inject('selectedAuthors');
    const quotes = inject('quotes');

    console.log('执行setup函数')
  
    const updateSearchQuery = (value) => {
      searchQuery.value = value;
    };

    const updateQuotes = (value) => {
      quotes.value = value;
    };

    const setActiveElement = (element) => {
      activeElement.value = element;
    };

    console.log("searchQuery的值"+searchQuery.value)

    // 可以直接修改或使用这些值
    // 例如，修改 searchQuery
    // searchQuery.value = 'new query';
    
    return { searchQuery, activeElement ,quotes,selectedAuthors,updateSearchQuery,setActiveElement,updateQuotes};
  },

  data() {
    return {
     // quotes: []

     // 添加搜索提示数据
      searchHints: [
        '读书的乐趣',
        '爱情的甜美',
        '人生的哲理',
        '思考的乐趣',
        '怡然童趣',
        '巍巍河山'
      ]
    };
  },
  methods: {
   
     handleDataReceived(data) {
      console.log('Received data from child:', data);
      this.quotes = data;
      console.log(data.result);
       console.log("homepage");
      // 在这里处理或存储接收到的数据
      this.navigate();
    },
    handleFetchError(error) {
      console.error('Error fetching data:', error);
      // 在这里处理错误
    },
   navigate() {
      this.$router.push('/search');
    },

    triggerSearch(hint) {
      // 当点击搜索提示时，调用 search 方法
      this.updateSearchQuery(hint);
      this.search();

    },
  async search() {

     

     console.log(this.searchQuery)
      
      if (this.searchQuery.trim() === '') {
        // 如果搜索查询为空或只有空格，可能要显示一些提示或不执行搜索
        alert('Please enter a search query.');
        return;
      }

      try {
          let url;
          if (this.selectedAuthors.length > 0 ){

            url = new URL('/api/search_filter', window.location.origin);
            url.searchParams.append('q', this.searchQuery);  
            url.searchParams.append('author', this.selectedAuthors[0]);

          }else{
            url = new URL('/api/search', window.location.origin);
            url.searchParams.append('q', this.searchQuery);
            console.log("添加的作者"+this.selectedAuthors[0]);

          }
      // const url = new URL('/api/search', window.location.origin);
      // url.searchParams.append('q', this.searchQuery);
      // console.log("添加的作者"+this.selectedAuthors[0]);

          const response = await fetch(url, {
               method: 'GET',
          headers: {
             'Content-Type': 'aplpication/json',
             // 其他头部信息
            }
          // 移除了body部分
          });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

         const data = await response.json();
      //  // console.log(data.result);
      //   // 发送数据给父组件
      //   this.$emit('dataReceived', data.result);
      this.updateQuotes(data.result)
      console.log("更新了返回结构")



      } catch (error) {
        console.error('Fetch error:', error);
        // 可以选择也将错误信息通过事件发送给父组件
        this.$emit('fetchError', error);
      }

     this.navigate()
      
    }


  }
};
</script>


