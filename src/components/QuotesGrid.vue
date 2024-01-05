<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <quote-card v-for="quote in quotes" :key="quote.id" :quote="quote" @dataReceived="handleDataReceived" @fetchError="handleFetchError" />
  </div>
</template>

<script>
import QuoteCard from './QuoteCard.vue';

export default {
  name: "QuotesGrid",
  components: {
    QuoteCard
  },
  props: {
    quotes: Array
  },

    methods: {
   
     handleDataReceived(data) {
      console.log('Received data from child:', data);

      this.$emit('dataReceived', data);
      // 在这里处理或存储接收到的数据
      
    },
    handleFetchError(error) {
      this.$emit('fetchError', error);
      // 在这里处理错误
    }


  }
};
</script>
