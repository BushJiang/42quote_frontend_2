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
    <div class="text-right text-sm italic font-semibold text-blue-gray-400"> <!-- 调整了这里的样式 -->
      {{ '—— ' + quote.author }}<template v-if="quote.title.length <= 15">《{{ quote.title }}》</template>
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
  },
  methods: {
  copyText() {
    // 创建一个文本区域元素
    const textarea = document.createElement('textarea');
    // 设置文本内容为引用的第一段、作者和标题
    textarea.value = `${this.quote.paragraphs[0]} —— ${this.quote.author} 《${this.quote.title}》`;
    // 将文本区域元素添加到文档中
    document.body.appendChild(textarea);
    // 选中文本区域的内容
    textarea.select();
    // 执行复制命令
    document.execCommand('copy');
    // 移除文本区域元素
    document.body.removeChild(textarea);
  },
    addToFavorites() {
      // 实现添加到收藏的逻辑
    },
    async searchItem() {
     
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



