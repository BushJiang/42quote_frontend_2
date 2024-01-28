<template>

 <router-view></router-view>

</template>


<script>
import { provide, ref } from 'vue';

export default {

  setup() {
    const searchQuery = ref('');
    const activeElement = ref('semantic');
    const selectedAuthors = ref([]);
    const quotes = ref([]);

// 之后可以增加更多
    provide('searchQuery', searchQuery);
    provide('activeElement', activeElement);
    provide('selectedAuthors', selectedAuthors);
    provide('quotes', quotes);

    return { searchQuery, activeElement , selectedAuthors,quotes};
  },

  name: 'App',
  components: {

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
