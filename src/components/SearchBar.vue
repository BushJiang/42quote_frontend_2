<template>
  <div class="flex flex-col items-center justify-center mt-4">
    <h1 class="text-2xl md:text-4xl text-center mb-14" style="font-family: 'Brush Script MT', cursive;">一键获取最懂你的金句</h1>
    <div class="w-full md:w-1/2">
      <div class="relative">
        <input
          :value="searchQuery"
          @input="updateSearchQuery($event.target.value)" 
          type="text" 
          placeholder="搜索..." 
          class="pl-10 pr-10 py-3 border rounded-t-md w-full focus:outline-none focus:border-gray-700 transition duration-300 ease-in-out text-lg"
          @keyup.enter="search"
        />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button 
            @click="search" 
            class="text-gray-500"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6a4 4 0 101 7.9V16l6 3-2-6v-3a4 4 0 00-5-3.9z" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex space-x-1 justify-end mt-1">
        <button 
          :class="{'bg-gray-700 text-white': activeElement === 'semantic', 'bg-gray-200 text-gray-700': activeElement!== 'semantic'}"
          class="px-3 py-1 border border-gray-300 rounded-bl-md text-sm hover:bg-gray-300 transition duration-300"
          @click="setActiveElement('semantic')"
        >
          语义
        </button>
        <button 
          :class="{'bg-gray-700 text-white': activeElement === 'character', 'bg-gray-200 text-gray-700': activeElement !== 'character'}"
          class="px-3 py-1 border border-gray-300 rounded-br-md text-sm hover:bg-gray-300 transition duration-300"
          @click="setActiveElement('character')"
        >
          字符
        </button>
      </div>
    </div>
  </div>
</template>

<script>


import { inject } from 'vue';
export default {
  name: "SearchBar",
  
  data() {
    console.log('执行data函数')
    return {
      // searchQuery: '',  // 绑定到输入框的数据
      // activeElement2: 'semantic', // 默认激活的元素
    };
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


  // setActiveElement(element) {
   
  //    this.activeElement = element;

  // },

  methods: {


  async search() {

     console.log(this.searchQuery)
      
      if (this.searchQuery.trim() === '') {
        // 如果搜索查询为空或只有空格，可能要显示一些提示或不执行搜索
        alert('Please enter a search query.');
        return;
      }


      try {
          // 从环境变量中读取后端url
          // Vue CLI 根据运行环境，自动判断加载不同的环境文件（.vue 或者 .vue.production）
          // 比如，运行 npm run serve，构建开发用的vue应用，Vue CLI 会自动加载.env 文件中的变量，如果存在 .env.development 文件，也会加载，并且覆盖同名变量。
          // 运行 npm run build，构建生产用的vue应用，Vue CLI 会自动加载 .env 文件中的变量，如果存在 .env.production 文件，也会加载，并且覆盖同名变量。
          // 但是，在实际部署（生产环境）中，环境变量一般在部署服务（比如render）的配置页面中设置，而不是读取 .env 文件中的变量（因为它们一般不上传）

          // || window.location.origin：这是一个逻辑或操作符，用于提供一个回退选项。
          // 如果 process.env.VUE_APP_BACKEND_URL 未定义（例如，当在本地环境中没有设置该环境变量时），
          // 则使用 window.location.origin。它返回当前网页的原始 URL（协议、域名和端口），例如 http://localhost:8080。
          
          // 注意：在开发环境，可以从环境变量中获取后端url，但是使用了nginx后，它无法从环境变量中获取后端url，所以要直接写出url
          // const baseUrl = process.env.VUE_APP_BACKEND_URL || window.location.origin;
          // const baseUrl = "https://four2quote-backend.onrender.com";
          const baseUrl = "/api";

          // 调试前端请求
          console.log("Making request to:", baseUrl);




          let url;
          if (this.selectedAuthors.length > 0 ){

            url = new URL('/api/search_filter', baseUrl);
            url.searchParams.append('q', this.searchQuery);  
            url.searchParams.append('author', this.selectedAuthors[0]);

          }else{
            url = new URL('/api/search', baseUrl);
            url.searchParams.append('q', this.searchQuery);
            console.log("添加的作者"+this.selectedAuthors[0]);

          }
      // const url = new URL('/api/search', window.location.origin);
      // url.searchParams.append('q', this.searchQuery);
      // console.log("添加的作者"+this.selectedAuthors[0]);

          const response = await fetch(url, {
               method: 'GET',
          headers: {
             'Content-Type': 'application/json',
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



      } catch (error) {
        console.error('Fetch error:', error);
        // 可以选择也将错误信息通过事件发送给父组件
        this.$emit('fetchError', error);
      }
      
    }
  }
};
</script>

<style>
/* 如果需要的话，这里可以添加额外的样式 */
</style>
