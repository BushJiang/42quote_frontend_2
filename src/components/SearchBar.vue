<template>
  <div class="flex items-center justify-between max-w-lg mx-auto p-2 rounded-md shadow-md">
    <!-- 搜索输入框 -->
    <div class="flex-1">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Enter a query" 
        class="w-full p-2 rounded-l-md border-2 border-r-0 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />
    </div>
    <!-- 搜索按钮 -->
    <button 
      @click="search" 
      class="bg-red-500 text-white px-4 py-2 rounded-r-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
    >
      Search
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: '',  // 绑定到输入框的数据
    };
  },
  methods: {
    async search() {
      if (this.searchQuery.trim() === '') {
        // 如果搜索查询为空或只有空格，可能要显示一些提示或不执行搜索
        alert('Please enter a search query.');
        return;
      }
      try {
        const url = new URL('http://0.0.0.0:8000/api/search');
          url.searchParams.append('q', this.searchQuery);
            url.searchParams.append('neural',true);


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
       // console.log(data.result);
        // 发送数据给父组件
        this.$emit('dataReceived', data.result);
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
