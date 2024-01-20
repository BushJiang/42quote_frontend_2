# 第一阶段：构建应用
# 基于官方 Node.js Docker 镜像
FROM node:14 as build
# 设置工作目录
WORKDIR /app
# 把package.json和package-lock.json复制到容器工作目录 /app 中
COPY package*.json ./
# 安装项目依赖
RUN npm install
# 复制项目文件
COPY . .
# 构建静态文件
RUN npm run build

# 第二阶段：使用 Nginx 作为静态文件服务器
# 使用 Nginx
FROM nginx:stable-alpine
# 从构建阶段复制构建的静态文件
COPY --from=build /app/dist /usr/share/nginx/html
# 复制自定义的 nginx 配置文件
COPY nginx.conf /etc/nginx/nginx.conf
# 暴露端口 80
EXPOSE 80
# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
