<template>
  <div>
    <!-- 导航栏容器 -->
    <nav class="flex items-center justify-between border-b-2 py-4">
      <!-- 左边的图标 -->
      <div class="ml-4">
          <img src="@/assets/logo.png" alt="My Image" class="h-16 w-16">
      </div>

      <!-- 标题 -->
      <h1 class="text-xl font-semibold">42quote：一键获取最懂你的金句</h1>

      <!-- 右边登录按钮 -->
      <div class="mr-4">
        <button class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">登录</button>
      </div>
    </nav>
    <!-- 导航栏下方的主体内容 -->
    <div class="mt-4">
      <!-- 主体内容 -->
    </div>
  </div>
</template>

<style>
/* 这里可以添加一些全局或特定的样式 */
</style>


<script>
export default {
  name: 'NavBar'
};
</script>

