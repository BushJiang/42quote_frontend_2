# 第一阶段：构建应用
# 基于官方 Node.js Docker 镜像
FROM node:14 as build-stage

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json（如果存在）
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件和目录到工作目录
COPY . .

# 构建应用
RUN npm run build

# 第二阶段：使用 Nginx 作为静态文件服务器
# 使用 Nginx
FROM nginx:stable-alpine as production-stage

# 复制构建结果到 Nginx 用于提供服务的目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露端口 80
EXPOSE 80

# 使用 Nginx 启动服务
CMD ["nginx", "-g", "daemon off;"]
