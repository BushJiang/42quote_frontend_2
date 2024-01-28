<template>
  <div class="flex gap-6">
    <!-- 侧边栏区域 -->
    <aside class="w-full md:w-1/4 bg-white p-4 border-r shadow-lg">
      <nav class="sticky top-0">
        <h2 class="text-lg font-semibold mb-2">十二诗神</h2>
        <div class="grid grid-cols-2 gap-2">
          <button 
            v-for="author in authors" 
            :key="author"
            class="rounded-lg py-2 px-4 hover:bg-gray-100 focus:outline-none text-sm"
            :class="{'bg-gray-300 font-bold': selectedAuthors.includes(author), 
                     'bg-gray-100': !selectedAuthors.includes(author)}"
            @click="toggleAuthorSelection(author)">
            {{ author }}
          </button>
        </div>
        <!-- 世界文豪区域 -->
        <h2 class="text-lg font-semibold mt-4">世界文豪</h2>
        <div class="inline-flex rounded-md shadow-sm mt-1 mb-4" role="group">
          <button v-for="mood in ['光明', '黑暗', '灰色']" :key="mood"
                  class="px-4 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-l-md hover:bg-gray-50 focus:z-10 focus:ring-2 focus:ring-gray-300"
                  :class="{'bg-gray-200': selectedMood === mood}"
                  @click="selectMood(mood)">
            {{ mood }}
          </button>
        </div>


      <!-- 下方内容区域 -->



        <div class="grid grid-cols-2 gap-2">
          <button 
            v-for="author in moods[selectedMood]" 
            :key="author"
            class="rounded-lg py-2 px-4 hover:bg-gray-100 focus:outline-none text-sm"
            :class="{'bg-gray-300 font-bold': selectedAuthors.includes(author), 
                     'bg-gray-100': !selectedAuthors.includes(author)}"
            @click="toggleAuthorSelection(author)">
            {{ author }}
          </button>
        </div>
      </nav>
    </aside>

    <!-- 主内容区域 -->
    <div class="w-full md:flex-grow">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <quote-card 
          v-for="quote in quotes" 
          :key="quote.id" 
          :quote="quote" 
          @dataReceived="handleDataReceived" 
          @fetchError="handleFetchError" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import QuoteCard from './QuoteCard.vue';
import { inject } from 'vue';

export default {
  name: "QuotesGrid",
  components: {
    QuoteCard
  },
  props: {
    // quotes: Array
  },
  data() {
    return {
      authors: ['陶渊明', '王维', '李白', '苏轼', '辛弃疾', '海子', '松尾芭蕉', '波德莱尔', '狄金森', '泰戈尔', '里尔克', '索德格朗'],
      //selectedAuthors: [],
      selectedMood: '光明',
      moods: {
        '光明': ['塞万提斯', '狄更斯', '卡罗尔', '毛姆', '海明威', '埃克苏佩里', '沈从文', '阿西莫夫', '卡尔维诺', '泽拉兹尼'], // 光明模式下的作者列表
        '黑暗': ['莎士比亚', '曹雪芹', '歌德', '鲁迅', '卡夫卡', '纳博科夫', '奥威尔', '太宰治', '田中芳村', '三岛由纪夫'], // 黑暗模式下的作者列表
        '灰色': ['奥斯汀', '易卜生', '马克吐温', '契诃夫', '夏目漱石', '福克纳', '博尔赫斯', '张爱玲', '莱姆', '王小波']  // 灰色模式下的作者列表
      }
    };
  },
  setup() {
    const searchQuery = inject('searchQuery');
    const activeElement = inject('activeElement');
    const selectedAuthors = inject('selectedAuthors');
    const quotes = inject('quotes');

    const toggleAuthorSelection = (data) => { 
      const index = selectedAuthors.value.indexOf(data);
      if (index === -1) {
        selectedAuthors.value.push(data);
      } else {
        selectedAuthors.value.splice(index, 1);
      }
    };
    return { searchQuery, activeElement ,selectedAuthors,toggleAuthorSelection,quotes};
  },
 computed: {
 
  },

  methods: {
   
    selectMood(mood) {
      this.selectedMood = this.selectedMood === mood ? '' : mood;
    },
    handleDataReceived(data) {
      console.log('Received data from child:', data);
      this.$emit('dataReceived', data);
    },
    handleFetchError(error) {
      console.log('Error received:', error);
      this.$emit('fetchError', error);
    }
  }
};
</script>
