<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <quote-card v-for="quote in quotes" :key="quote.id" :quote="quote" />
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
  }
};
</script>
