<template>
  <div class="max-w-md rounded overflow-hidden shadow-lg p-4 group">
    <div class="absolute opacity-0 group-hover:opacity-100 transition-opacity">
      <span class="cursor-pointer p-2" @click="copyText">📋</span>
      <span class="cursor-pointer p-2" @click="addToFavorites">❤️</span>
      <span class="cursor-pointer p-2" @click="searchItem">🔍</span>
    </div>
    <p class="text-gray-700 text-base">
      {{ quote.paragraphs[0] }}
    </p>
    <div class="text-right text-sm italic font-semibold text-blue-gray-400">
      {{ '—— ' + quote.author }}
      <!-- 重新编写的逻辑 -->
      <template v-if="quote.title.length <= 15">
        <template v-if="quote.title.includes('《') && quote.title.includes('》')">
          {{ quote.title }}
        </template>
        <template v-else>
          《{{ quote.title }}》
        </template>
      </template>
    </div>
  </div>
</template>



<script>
import { inject } from 'vue';
export default {
  name: "QuoteCard",
  props: {
    quote: {
      type: Object,
      required: true
    }
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
  methods: {
  copyText() {
  console.log('Original title:', this.quote.title); // 调试输出原标题

  // 检查并在必要时修改标题
  let title = this.quote.title;
  if (!title.startsWith('《') || !title.endsWith('》')) {
    title = `《${title}》`;
  }

  console.log('Modified title:', title); // 调试输出修改后的标题

  // 创建文本内容
  const textToCopy = `${this.quote.paragraphs[0]} —— ${this.quote.author} ${title}`;
  console.log('Text to copy:', textToCopy); // 调试输出要复制的文本

  // 调用复制到剪贴板的函数
  this.copyToClipboard(textToCopy);
},

copyToClipboard(text) {
  // 创建一个文本区域元素
  const textarea = document.createElement('textarea');
  textarea.style.position = 'absolute'; // 使文本框不可见
  textarea.style.left = '-9999px';
  // 设置文本内容
  textarea.value = text;
  // 将文本区域元素添加到文档中
  document.body.appendChild(textarea);
  // 选中文本区域的内容
  textarea.select();
  // 执行复制命令
  const successful = document.execCommand('copy');
  console.log('Copy successful:', successful); // 调试输出是否复制成功

  // 移除文本区域元素
  document.body.removeChild(textarea);
},
    addToFavorites() {
      // 实现添加到收藏的逻辑
    },
    async searchItem() {
     this.clearSelectedAuthors()
     this.updateSearchQuery(this.quote.paragraphs[0]);
      try {
        const url = new URL('/api/search', window.location.origin);
          url.searchParams.append('q', this.quote.paragraphs[0]);
         // url.searchParams.append('neural',true);
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
       // console.log(data.result);
        // 发送数据给父组件
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

<style scoped>
.group {
  position: relative; /* 确保卡片具有相对定位 */
}

.group:hover .absolute {
  opacity: 1; /* 当鼠标悬停在卡片上时显示悬浮栏 */
}

.absolute {
  position: absolute;
  bottom: 0; /* 将悬浮栏定位在卡片的底部 */
  left: 0; /* 将悬浮栏定位在卡片的左边 */
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 10; /* 确保悬浮栏显示在内容之上 */
}

.text-blue-gray-400 {
  color: #cbd5e1; /* 这是一种较浅的蓝灰色 */
}
.italic {
  font-style: italic; /* 斜体 */
}
.font-semibold {
  font-weight: 400; /* 半粗体 */
}
</style>



