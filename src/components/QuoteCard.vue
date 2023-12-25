

<template>
  <div class="max-w-md rounded overflow-hidden shadow-lg p-4">
    <p class="text-gray-700 text-base">
      "{{ quote.document }}"
    </p>
    <div class="text-right text-sm text-gray-700">
      {{ '-- ' + quote.author + ' 《' + quote.rhythmic + '》' }}
    </div>
  </div>
</template>





<script>
export default {
  name: "QuoteCard",
  props: {
    quote: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
/* 你可以在这里添加一些特定于这个组件的样式 */
</style>
