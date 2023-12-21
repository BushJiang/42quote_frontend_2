/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 这会匹配 src 目录下的所有文件扩展名为 .vue, .js, .ts, .jsx, 和 .tsx 的文件
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

