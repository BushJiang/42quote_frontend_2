<template>
  <div>
    <!-- 导航栏容器 -->
    <nav class="flex items-center justify-between py-3">
      <!-- 左边的图标 -->
      <div class="ml-4">
        <img src="@/assets/logo.png" @click="navigateToHome" alt="My Image" class="h-12 w-12">
      </div>
      
      <!-- 右侧功能图标和登录按钮 -->
      <div class="flex items-center mr-4">
        <!-- 搜索记录 -->
        <div class="mx-2 flex items-center">
          <font-awesome-icon icon="search" class="text-lg"/>
          <span class="ml-2 text-sm">搜索记录</span>
        </div>
        <!-- 收藏 -->
        <div class="mx-2 flex items-center">
          <font-awesome-icon icon="star" class="text-lg"/>
          <span class="ml-2 text-sm">收藏</span>
        </div>
        <!-- 问题反馈 -->
        <div class="mx-2 flex items-center">
          <font-awesome-icon icon="comment-dots" class="text-lg"/>
          <span class="ml-2 text-sm">问题反馈</span>
        </div>

        <!-- 登录按钮 -->
        <button class="ml-2 px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-300">登录</button>
      </div>
    </nav>
    <!-- 导航栏下方的主体内容 -->
    <div class="mt-2">
      <!-- 主体内容 -->
    </div>
  </div>
</template>



<style>
/* 这里可以添加一些全局或特定的样式 */
</style>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { inject } from 'vue';
export default {
  name: 'NavBar',
  components: {
    FontAwesomeIcon
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

    const clearSelectedAuthors = () => {
    selectedAuthors.value = [];
  };

    console.log("searchQuery的值"+searchQuery.value)

    // 可以直接修改或使用这些值
    // 例如，修改 searchQuery
    // searchQuery.value = 'new query';
    
    return { searchQuery, activeElement ,quotes,selectedAuthors,updateSearchQuery,setActiveElement,updateQuotes,clearSelectedAuthors};
  },
  methods:{
      navigateToHome() {
      this.updateSearchQuery("")
      this.clearSelectedAuthors()
      this.$router.push('/');
    },
  }
};
</script>
