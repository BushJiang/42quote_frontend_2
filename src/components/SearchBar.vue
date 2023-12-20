<template>
  <div class="mb-4">
    <input v-model="searchQuery" type="text" placeholder="搜索金句..." class="w-full p-2 border border-gray-300 rounded-md">
    <button @click="$emit('search', searchQuery)" class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">搜索</button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: ''
    };
  }
};
</script>
